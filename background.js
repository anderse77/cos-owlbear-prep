// Körs i bakgrunden (manifest background_url) hela tiden rummet är öppet, bara hos spelledaren.
// Kopplar automatiskt rätt statblock i Game Master's Grimoire när en token dras in i en scen:
//  - Spelartokens (namnet matchar en spelare i players.js) → spelarens eget statblock (slug -anderse77).
//  - Monster-tokens som heter exakt som ett monster i locations.js → rätt 2024-/eget statblock,
//    men bara om Grimoire inte kopplat något alls, eller kopplat en annan version av samma monster
//    (t.ex. ghoul-wotc-srd i stället för ghoul-wotcsrd). Något helt annat som spelledaren valt rörs inte.
import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.1.0/+esm";
import { PLAYERS } from "./players.js?v=151";
import { MONSTERS } from "./locations.js?v=151";

const ID = "com.anderse77.cos-prep";
const PLACED_KEY = `${ID}/placed`;
const GMG_KEY = "com.bitperfect-software.hp-tracker/data";
const LOG_KEY = `${ID}/autolink-log`;

const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const base = (slug) => (slug || "").split("-")[0]; // "ghoul-wotcsrd" → "ghoul"

const players = Object.entries(PLAYERS).map(([slug, p]) => ({ slug, key: norm(p.name), p }));
const monsters = Object.entries(MONSTERS).map(([name, m]) => ({ name, key: norm(name), m }));

function dedupe(limits) {
  const seen = new Set();
  return (limits || []).filter((l) => !seen.has(l.id) && seen.add(l.id)).map((l) => ({ ...l, used: 0 }));
}

function gmgData({ slug, hp, ac, init, limits }, old, isPlayer) {
  return {
    hpTrackerActive: true,
    canPlayersSee: isPlayer,
    hpOnMap: false, acOnMap: false, hpBar: isPlayer,
    initiative: 0,
    equipment: { equipped: [], attuned: [] },
    playerMap: { hp: isPlayer, ac: isPlayer },
    playerList: isPlayer,
    ...(old || {}), // behåll Grimoires egna visningsinställningar om de finns
    sheet: slug,
    ruleset: "e5",
    hp, maxHp: hp, armorClass: ac,
    stats: { ...(old?.stats || {}), initiativeBonus: init, initial: false, limits: dedupe(limits) },
  };
}

// Vilket statblock ska token ha? Returnerar null om den ska lämnas ifred.
function target(item) {
  if (item.layer !== "CHARACTER" || item.metadata?.[PLACED_KEY]) return null; // CoS Prep-placerade är redan rätt
  const n = norm(item.name);
  if (!n) return null;
  const sheet = item.metadata?.[GMG_KEY]?.sheet;
  // Spelare: exakt namn, eller namnet börjar med spelarens namn ("River 2", "Ragnak (häst)" räknas inte – kräver exakt eller siffra efter).
  // Spelare känns igen på namnet ELLER på att token redan har spelarens statblock.
  const pl = players.find((x) => x.slug === sheet) || players.find((x) => n === x.key || new RegExp(`^${x.key}[0-9]*$`).test(n));
  if (pl) {
    const g = item.metadata?.[GMG_KEY];
    const data = { slug: pl.slug, hp: pl.p.hp, ac: pl.p.ac, init: pl.p.init, limits: pl.p.limits };
    if (sheet !== pl.slug) return { kind: "spelare", data, isPlayer: true, from: sheet };
    // Rätt statblock men gamla värden (t.ex. nivå 1) → uppdatera maxHP/AC/init, behåll skada.
    if (g.maxHp !== pl.p.hp || g.armorClass !== pl.p.ac || g.stats?.initiativeBonus !== pl.p.init)
      return { kind: "spelare", data, isPlayer: true, from: sheet, refresh: true, oldMax: g.maxHp };
    return null;
  }
  const mo = monsters.find((x) => n === x.key || new RegExp(`^${x.key}[0-9]*$`).test(n));
  if (mo && mo.m.stats) {
    if (sheet === mo.m.slug) return null;
    if (sheet && base(sheet) !== base(mo.m.slug)) return null; // spelledaren har valt något annat – rör inte
    const s = mo.m.stats;
    return { kind: "monster", data: { slug: mo.m.slug, hp: s.hp, ac: s.ac, init: s.init, limits: s.limits }, isPlayer: false, from: sheet };
  }
  return null;
}

let busy = false, again = false;
const tries = {}; // skydd mot att två tillägg skriver över varandra i all oändlighet
async function fix(items) {
  if (busy) { again = true; return; }
  busy = true;
  try {
    const todo = items.map((i) => ({ i, t: target(i) })).filter((x) => x.t && (tries[x.i.id] = (tries[x.i.id] || 0) + 1) <= 3);
    if (!todo.length) return;
    const byId = Object.fromEntries(todo.map((x) => [x.i.id, x.t]));
    await OBR.scene.items.updateItems(Object.keys(byId), (list) => {
      list.forEach((i) => {
        const t = byId[i.id];
        const old = i.metadata[GMG_KEY];
        // Var det redan rätt spelare men fel värden lämnar vi HP ifred; annars full HP.
        if (t.refresh) {
          // Samma statblock, nya värden: behåll skada och använda förmågor.
          const d = gmgData(t.data, old, t.isPlayer);
          const dmg = (old.maxHp ?? d.maxHp) - (old.hp ?? old.maxHp ?? d.maxHp);
          d.hp = Math.max(0, Math.min(d.maxHp, d.maxHp - dmg));
          d.stats.limits = d.stats.limits.map((l) => {
            const cur = old.stats?.limits?.find((c) => c.id === l.id);
            return { ...l, used: cur ? Math.min(cur.used, l.max) : 0 };
          });
          i.metadata[GMG_KEY] = d;
        } else {
          i.metadata[GMG_KEY] = gmgData(t.data, t.from ? null : old, t.isPlayer);
        }
      });
    });
    const lines = todo.map((x) => `${new Date().toLocaleTimeString("sv-SE")} ${x.i.name}: ` +
      (x.t.refresh ? `${x.t.data.slug} uppdaterad, max-HP ${x.t.oldMax} → ${x.t.data.hp}, AC ${x.t.data.ac}` : `${x.t.from || "(inget)"} → ${x.t.data.slug} (HP ${x.t.data.hp}, AC ${x.t.data.ac})`));
    lines.forEach((l) => console.log("[CoS Prep] autokoppling", l));
    const meta = await OBR.scene.getMetadata();
    const prev = meta[LOG_KEY] || [];
    await OBR.scene.setMetadata({ [LOG_KEY]: [...lines, ...prev].slice(0, 30) });
    OBR.notification.show(`CoS Prep: ${todo.length === 1 ? todo[0].i.name : todo.length + " tokens"} ${todo.every((x) => x.t.refresh) ? "uppdaterad med nya spelarvärden" : "kopplad till rätt statblock"}.`, "SUCCESS");
  } catch (e) {
    console.error("[CoS Prep] autokoppling misslyckades", e);
  } finally {
    busy = false;
    if (again) { again = false; fix(await OBR.scene.items.getItems()); }
  }
}

let unsub = null;
async function start() {
  if (unsub) { unsub(); unsub = null; }
  if ((await OBR.player.getRole()) !== "GM") return;
  if (!(await OBR.scene.isReady())) return;
  // Grimoire kopplar ibland en kort stund efter att token dragits in – vi rättar då igen.
  unsub = OBR.scene.items.onChange((items) => fix(items));
  fix(await OBR.scene.items.getItems());
}

OBR.onReady(() => {
  start();
  OBR.scene.onReadyChange(() => start());
});
