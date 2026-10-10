import OBR, { buildImage } from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.1.0/+esm";
import { MONSTERS, LOCATIONS } from "./locations.js?v=110";
import { PLAYERS, PLAYERS_UPDATED } from "./players.js";
import { DAY, NIGHT, HOUSES, ENCOUNTER_RULES } from "./encounters.js?v=110";

const ID = "com.anderse77.cos-prep";
const TOKENS_KEY = `${ID}/tokens`; // rummets metadata: monsternamn -> bild
const PLACED_KEY = `${ID}/placed`; // item-metadata: vilken plats token tillhör
const GMG_KEY = "com.bitperfect-software.hp-tracker/data"; // Game Master's Grimoire
const TA_API = "https://api.tabletop-almanac.com/api/v1";

const $ = (s) => document.querySelector(s);
const log = (msg, kind = "") => {
  const el = document.createElement("div");
  el.className = "msg " + kind;
  el.textContent = msg;
  $("#log").prepend(el);
};

let tokenMap = {};

// ---------- Tabletop Almanac / Grimoire ----------

const statblockCache = {};
async function fetchStatblock(name, slug) {
  if (statblockCache[slug]) return statblockCache[slug];
  const url = `${TA_API}/e5/statblock/search/?search_string=${encodeURIComponent(name)}&take=20&skip=0`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Tabletop Almanac svarade ${res.status}`);
  const list = await res.json();
  const sb = list.find((s) => s.slug === slug);
  if (!sb) throw new Error(`Hittade inte statblock "${slug}"`);
  statblockCache[slug] = sb;
  return sb;
}

// Samma logik som Grimoire (getLimitsE5) så att begränsade förmågor räknas rätt.
function getLimits(sb) {
  const limits = [];
  const fromActions = (arr) =>
    (arr || []).forEach((a) => {
      if (a.limit) limits.push({ id: a.limit.name, max: a.limit.uses, used: 0, resets: a.limit.resets ?? [], formula: a.limit.formula });
    });
  ["actions", "reactions", "bonus_actions", "special_abilities", "lair_actions", "mythic_actions", "legendary_actions"].forEach((k) => fromActions(sb[k]));
  (sb.spell_slots || []).forEach((s) => limits.push({ id: s.limit.name, max: s.limit.uses, used: 0, resets: s.limit.resets ?? [] }));
  (sb.limits || []).forEach((l) => limits.push({ id: l.name, max: l.uses, used: 0, resets: l.resets ?? [], formula: l.formula }));
  return limits;
}

async function gmgMetadata(monsterName) {
  const m = MONSTERS[monsterName];
  let hp, ac, init, limits = [], source;
  if (m.stats) {
    ({ hp, ac, init } = m.stats);
    limits = structuredClone(m.stats.limits || []);
    source = "inbyggda värden från Tabletop Almanac";
  } else {
    // Monster utan inbyggda värden: försök hämta (fungerar bara om TA tillåter anropet).
    const sb = await fetchStatblock(monsterName, m.slug);
    hp = sb.hp.value;
    ac = sb.armor_class.value;
    init = sb.initiative ?? Math.floor(((sb.stats?.dexterity ?? 10) - 10) / 2);
    limits = getLimits(sb);
    source = "Tabletop Almanac";
  }
  return {
    source,
    data: {
      hp, maxHp: hp, armorClass: ac,
      hpTrackerActive: true,
      canPlayersSee: false,
      hpOnMap: false, acOnMap: false, hpBar: false,
      initiative: 0,
      sheet: m.slug,
      ruleset: "e5",
      equipment: { equipped: [], attuned: [] },
      stats: { initiativeBonus: init, initial: false, limits },
      playerMap: { hp: false, ac: false },
      playerList: false,
    },
  };
}

// ---------- Monsterbilder ----------

async function loadTokenMap() {
  const meta = await OBR.room.getMetadata();
  tokenMap = meta[TOKENS_KEY] || {};
  renderTokenStatus();
}

function renderTokenStatus() {
  const ul = $("#tokens");
  ul.innerHTML = "";
  Object.keys(MONSTERS).forEach((name) => {
    const li = document.createElement("li");
    const ok = !!tokenMap[name];
    li.innerHTML = `<span class="${ok ? "ok" : "missing"}">${ok ? "✓" : "–"}</span> ${name}`;
    ul.appendChild(li);
  });
  const sel = $("#freeMonster");
  if (sel && !sel.options.length) Object.keys(MONSTERS).sort().forEach((n) => { const o = document.createElement("option"); o.value = n; o.textContent = n; sel.appendChild(o); });
}

async function pickImages() {
  log("Öppnar bildväljaren…");
  let picked;
  try {
    picked = await OBR.assets.downloadImages(true, undefined, "CHARACTER");
  } catch (e) {
    log("Bildväljaren gav fel: " + (e?.message || JSON.stringify(e)), "warn");
    return;
  }
  if (!picked || picked.length === 0) { log("Inga bilder valdes."); return; }
  const names = Object.keys(MONSTERS);
  let matched = 0;
  const unknown = [];
  picked.forEach((p) => {
    const name = names.find((n) => n.toLowerCase() === (p.name || "").trim().toLowerCase());
    if (name) {
      tokenMap[name] = { image: p.image, grid: p.grid, scale: p.scale || { x: 1, y: 1 } };
      matched++;
    } else unknown.push(p.name);
  });
  await OBR.room.setMetadata({ [TOKENS_KEY]: tokenMap });
  renderTokenStatus();
  log(`Kopplade ${matched} bild(er).`, "ok");
  if (unknown.length) log(`Okända namn (hoppades över): ${unknown.join(", ")}. Bilden måste heta exakt som monstret.`, "warn");
}

// Saknas bild för ett monster: öppna bildväljaren med monstrets namn ifyllt och spara valet.
async function ensureImage(name) {
  if (tokenMap[name]) return true;
  log(`Välj en bild för "${name}" (sökningen är förifylld).`);
  let picked;
  try {
    picked = await OBR.assets.downloadImages(false, name, "CHARACTER");
  } catch (e) {
    log(`Bildväljaren gav fel för ${name}: ` + (e?.message || JSON.stringify(e)), "warn");
    return false;
  }
  if (!picked || !picked.length) { log(`Ingen bild vald för ${name}.`, "warn"); return false; }
  const p = picked[0];
  tokenMap[name] = { image: p.image, grid: p.grid, scale: p.scale || { x: 1, y: 1 } };
  await OBR.room.setMetadata({ [TOKENS_KEY]: tokenMap });
  renderTokenStatus();
  log(`Bild kopplad: ${name} → "${p.name}".`, "ok");
  return true;
}

async function ensureImages(names) {
  for (const n of names) if (!(await ensureImage(n))) return false;
  return true;
}

// ---------- Karta och koordinater ----------

async function findMap() {
  const maps = await OBR.scene.items.getItems((i) => i.layer === "MAP" && i.type === "IMAGE");
  if (maps.length === 0) return null;
  maps.sort((a, b) => b.image.width * b.scale.x - a.image.width * a.scale.x);
  return maps[0];
}

async function cellToScene(map, loc, cell, size) {
  const sceneDpi = await OBR.scene.grid.getDpi();
  const kx = (sceneDpi / map.grid.dpi) * map.scale.x;
  const ky = (sceneDpi / map.grid.dpi) * map.scale.y;
  const [ox, oy] = loc.map.origin || [0, 0];
  const px = ox + (cell[0] + size / 2) * loc.map.cell;
  const py = oy + (cell[1] + size / 2) * loc.map.cell;
  return {
    x: map.position.x + (px - map.grid.offset.x) * kx,
    y: map.position.y + (py - map.grid.offset.y) * ky,
  };
}

// ---------- Placera / ta bort ----------

function currentLocation() {
  return LOCATIONS.find((l) => l.id === $("#location").value);
}

function renderLocation() {
  const loc = currentLocation();
  const box = $("#groups");
  box.innerHTML = "";
  loc.groups.forEach((g) => {
    const d = document.createElement("div");
    d.className = "group";
    d.innerHTML = `<b>${g.area}</b>: ${g.tokens.length} × ${g.monster}<div class="note">${g.note}</div>`;
    box.appendChild(d);
  });
  refreshPlacedCount();
}

async function placedItems(locId) {
  return OBR.scene.items.getItems((i) => i.metadata?.[PLACED_KEY]?.location === locId);
}

async function refreshPlacedCount() {
  const loc = currentLocation();
  const n = (await placedItems(loc.id)).length;
  $("#placedInfo").textContent = n ? `${n} monster från denna plats finns redan i scenen.` : "Inga monster från denna plats i scenen än.";
}

async function place() {
  const loc = currentLocation();
  const btn = $("#placeBtn");
  btn.disabled = true;
  try {
    const existing = await placedItems(loc.id);
    if (existing.length) {
      log(`Det finns redan ${existing.length} monster från "${loc.title}". Ta bort dem först för att undvika dubbletter.`, "warn");
      return;
    }
    if (!(await ensureImages([...new Set(loc.groups.map((g) => g.monster))]))) return;
    const map = await findMap();
    if (!map) { log("Hittar ingen karta i scenen.", "warn"); return; }
    if (map.rotation) { log("Kartan är roterad – stöds inte. Sätt rotationen till 0.", "warn"); return; }
    if (map.image.width !== loc.map.width || map.image.height !== loc.map.height) {
      log(`Kartan är ${map.image.width}×${map.image.height}, förväntade ${loc.map.width}×${loc.map.height}. Fel karta/scen?`, "warn");
      return;
    }
    const mapName = (map.name || "").toUpperCase();
    if (loc.mapHint && !mapName.includes(loc.mapHint)) {
      log(`Varning: kartan heter "${map.name}" – är du i rätt scen för ${loc.title}?`, "warn");
      if (!$("#force").checked) { log('Kryssa i "Placera ändå" om kartan är rätt.', "warn"); return; }
    }

    const items = [];
    for (const g of loc.groups) {
      const m = MONSTERS[g.monster];
      const t = tokenMap[g.monster];
      const gmg = await gmgMetadata(g.monster);
      for (const tok of g.tokens) {
        const pos = await cellToScene(map, loc, tok.cell, m.size);
        const item = buildImage(t.image, t.grid)
          .name(tok.name)
          .position(pos)
          .scale({ x: (t.scale?.x || 1) * m.size, y: (t.scale?.y || 1) * m.size })
          .rotation(0)
          .layer("CHARACTER")
          .visible(false)
          .locked(false)
          .metadata({
            [PLACED_KEY]: { location: loc.id, area: g.area },
            [GMG_KEY]: structuredClone(gmg.data),
          })
          .build();
        items.push(item);
      }
      log(`${g.area}: ${g.tokens.length} × ${g.monster} (HP ${gmg.data.maxHp}, AC ${gmg.data.armorClass}, statblock ${m.slug} från ${gmg.source}).`, "ok");
    }
    await OBR.scene.items.addItems(items);
    log(`Klart: ${items.length} dolda monster placerade på ${loc.title}.`, "ok");
    OBR.notification.show(`CoS Prep: ${items.length} dolda monster placerade.`, "SUCCESS");
  } catch (e) {
    console.error(e);
    log("Fel: " + e.message, "warn");
  } finally {
    btn.disabled = false;
    refreshPlacedCount();
  }
}

async function removePlaced() {
  const loc = currentLocation();
  const items = await placedItems(loc.id);
  if (!items.length) { log("Inget att ta bort.", ""); return; }
  if (!confirmRemove) {
    confirmRemove = true;
    $("#removeBtn").textContent = `Säker? Tar bort ${items.length} st – klicka igen`;
    setTimeout(() => { confirmRemove = false; $("#removeBtn").textContent = "Ta bort platsens monster"; }, 4000);
    return;
  }
  confirmRemove = false;
  $("#removeBtn").textContent = "Ta bort platsens monster";
  await OBR.scene.items.deleteItems(items.map((i) => i.id));
  log(`Tog bort ${items.length} monster från ${loc.title}.`, "ok");
  refreshPlacedCount();
}
let confirmRemove = false;

// Synkar spelarnas tokens i Grimoire med de senaste värdena (samma sak som Grimoires "håll inne för att synka").
async function syncPlayers() {
  const items = await OBR.scene.items.getItems((i) => i.metadata?.[GMG_KEY]?.sheet in PLAYERS);
  if (!items.length) { log("Inga spelartokens kopplade till kända statblock i scenen.", "warn"); return; }
  await OBR.scene.items.updateItems(items.map((i) => i.id), (list) => {
    list.forEach((i) => {
      const g = i.metadata[GMG_KEY];
      const p = PLAYERS[g.sheet];
      const seen = new Set();
      const limits = p.limits.filter((l) => !seen.has(l.id) && seen.add(l.id)).map((l) => {
        const cur = g.stats?.limits?.find((c) => c.id === l.id);
        return { ...l, used: cur ? Math.min(cur.used, l.max) : 0 };
      });
      i.metadata[GMG_KEY] = {
        ...g,
        maxHp: p.hp,
        hp: g.hp === g.maxHp ? p.hp : Math.min(g.hp, p.hp),
        armorClass: p.ac,
        stats: { ...g.stats, initiativeBonus: p.init, initial: false, limits },
      };
    });
  });
  const after = await OBR.scene.items.getItems(items.map((i) => i.id));
  after.forEach((i) => { const g = i.metadata[GMG_KEY]; log(`Synkad: ${i.name} – HP ${g.hp}/${g.maxHp}, AC ${g.armorClass}, init +${g.stats.initiativeBonus}`, "ok"); });
  log(`Spelarvärden från ${PLAYERS_UPDATED}. Stäng och öppna Grimoire-bladet för att se ändringen.`);
}

// Visar spelarnas tokens: vilket statblock de är kopplade till, HP och vilka tillägg som sparat data på dem.
async function showPlayers() {
  const items = await OBR.scene.items.getItems((i) => i.layer === "CHARACTER" && !i.metadata?.[PLACED_KEY]);
  if (!items.length) { log("Inga spelartokens i scenen.", "warn"); return; }
  items.forEach((i) => {
    const g = i.metadata?.[GMG_KEY];
    const others = Object.keys(i.metadata || {}).filter((k) => k !== GMG_KEY).map((k) => k.split("/")[0]).join(", ");
    log(`${i.name}: ${g ? `statblock ${g.sheet || "(inget)"}, HP ${g.hp}/${g.maxHp}, AC ${g.armorClass}, init +${g.stats?.initiativeBonus}` : "ej i Grimoire"}${others ? ` · övrigt: ${others}` : ""}`, g?.sheet ? "ok" : "warn");
  });
}

// Räknar tillbaka varje placerad tokens position till en ruta på kartan och jämför med planen.
async function verify() {
  const loc = currentLocation();
  const items = await placedItems(loc.id);
  if (!items.length) { log("Inget placerat att kontrollera.", ""); return; }
  const map = await findMap();
  const sceneDpi = await OBR.scene.grid.getDpi();
  const kx = (sceneDpi / map.grid.dpi) * map.scale.x;
  const ky = (sceneDpi / map.grid.dpi) * map.scale.y;
  const expected = {};
  loc.groups.forEach((g) => g.tokens.forEach((t) => (expected[t.name] = { cell: t.cell, size: MONSTERS[g.monster].size })));
  let bad = 0;
  items.forEach((i) => {
    const e = expected[i.name];
    const size = e?.size || 1;
    const px = (i.position.x - map.position.x) / kx + map.grid.offset.x;
    const py = (i.position.y - map.position.y) / ky + map.grid.offset.y;
    const [ox, oy] = loc.map.origin || [0, 0];
    const col = (px - ox) / loc.map.cell - size / 2, row = (py - oy) / loc.map.cell - size / 2;
    const ok = e && Math.abs(col - e.cell[0]) < 0.25 && Math.abs(row - e.cell[1]) < 0.25;
    if (!ok) bad++;
    const g = i.metadata?.[GMG_KEY];
    log(`${ok ? "✓" : "✗"} ${i.name}: ruta ${col.toFixed(1)},${row.toFixed(1)}${e ? ` (plan ${e.cell})` : ""}, ${i.visible ? "SYNLIG" : "dold"}, ${g ? `${g.sheet} HP ${g.hp}` : "ingen Grimoire-koppling"}`, ok && !i.visible && g ? "ok" : "warn");
  });
  try {
    const mb = await OBR.scene.items.getItemBounds([map.id]);
    const tb = await OBR.scene.items.getItemBounds(items.map((i) => i.id));
    log(`Kartans yta: ${Math.round(mb.min.x)},${Math.round(mb.min.y)} – ${Math.round(mb.max.x)},${Math.round(mb.max.y)}. Monstrens yta: ${Math.round(tb.min.x)},${Math.round(tb.min.y)} – ${Math.round(tb.max.x)},${Math.round(tb.max.y)}. Kartans position ${Math.round(map.position.x)},${Math.round(map.position.y)}, offset ${map.grid.offset.x},${map.grid.offset.y}.`);
    await OBR.player.select(items.map((i) => i.id));
    await OBR.viewport.animateToBounds(tb);
  } catch (e) { log("Kunde inte visa: " + e.message, "warn"); }
  log(`Karta: ${map.name} ${map.image.width}×${map.image.height}, dpi ${map.grid.dpi}, skala ${map.scale.x}×${map.scale.y}.`);
  log(bad ? `${bad} token(s) avviker från planen.` : `Alla ${items.length} tokens står på planerade rutor.`, bad ? "warn" : "ok");
}


// ---------- Tärningar ----------

function roll(expr) {
  const m = String(expr).replace(/\s|−/g, (c) => (c === "−" ? "-" : "")).match(/^(\d*)d(\d+)([+-]\d+)?$|^(\d+)$/);
  if (!m) return 1;
  if (m[4]) return +m[4];
  const n = +(m[1] || 1), sides = +m[2], mod = +(m[3] || 0);
  let t = 0;
  for (let i = 0; i < n; i++) t += 1 + Math.floor(Math.random() * sides);
  return Math.max(0, t + mod);
}
const d = (sides) => 1 + Math.floor(Math.random() * sides);

// ---------- Placera grupper vid skärmens mitt (slumpmöten, hus, valfritt monster) ----------

let lastGroup = null; // { creatures: [[namn, antal]], label }

async function placeAtView(creatures, label) {
  const list = creatures.filter(([, n]) => n > 0);
  if (!list.length) { log("Inga varelser att placera."); return; }
  if (!(await ensureImages(list.map(([n]) => n)))) return;
  const dpi = await OBR.scene.grid.getDpi();
  const w = await OBR.viewport.getWidth(), h = await OBR.viewport.getHeight();
  const c = await OBR.viewport.inverseTransformPoint({ x: w / 2, y: h / 2 });
  const groupId = `encounter-${Date.now()}`;
  const items = [];
  let col = 0, row = 0, rowH = 1;
  const perRow = 6;
  for (const [name, count] of list) {
    const m = MONSTERS[name];
    const t = tokenMap[name];
    const gmg = await gmgMetadata(name);
    for (let i = 1; i <= count; i++) {
      if (col + m.size > perRow) { col = 0; row += rowH; rowH = 1; }
      const pos = await OBR.scene.grid.snapPosition({ x: c.x + (col - perRow / 2 + m.size / 2) * dpi, y: c.y + (row + m.size / 2) * dpi }, 1, m.size % 2 === 0, m.size % 2 === 1);
      items.push(buildImage(t.image, t.grid)
        .name(count > 1 ? `${name} ${i}` : name)
        .position(pos)
        .scale({ x: (t.scale?.x || 1) * m.size, y: (t.scale?.y || 1) * m.size })
        .layer("CHARACTER").visible(false).locked(false)
        .metadata({ [PLACED_KEY]: { location: groupId, area: label }, [GMG_KEY]: structuredClone(gmg.data) })
        .build());
      col += m.size; rowH = Math.max(rowH, m.size);
    }
  }
  await OBR.scene.items.addItems(items);
  lastPlaced = groupId;
  await OBR.player.select(items.map((i) => i.id));
  log(`Placerade ${items.length} dolda tokens (${label}) mitt på skärmen. Flytta dem dit de ska och gör dem synliga när mötet börjar.`, "ok");
}
let lastPlaced = null;

async function removeLastPlaced() {
  if (!lastPlaced) { log("Inget placerat från slumpmöten i den här sessionen."); return; }
  const items = await placedItems(lastPlaced);
  await OBR.scene.items.deleteItems(items.map((i) => i.id));
  log(`Tog bort ${items.length} tokens från senaste placeringen.`, "ok");
  lastPlaced = null;
}

function showResult(title, text, creatures, extraLines = []) {
  const box = $("#encResult");
  const lines = creatures.filter(([, n]) => n > 0).map(([n, c]) => `${c} × ${n}`);
  box.innerHTML = `<b>${title}</b><div class="note">${text}</div>` + (lines.length || extraLines.length ? `<div>${[...lines, ...extraLines].join("<br>")}</div>` : "");
  lastGroup = { creatures, label: title };
  $("#encPlaceBtn").disabled = !creatures.some(([, n]) => n > 0);
}

function rollTable() {
  const night = $("#encTime").value === "night";
  const r = d(12) + d(8);
  const e = (night ? NIGHT : DAY)[r];
  let creatures = (e.creatures || []).map(([n, ex]) => [n, roll(ex)]);
  const extra = [];
  if (e.split) {
    const pick = d(2) === 1 ? e.split[0] : e.split[1];
    creatures = [[pick[0], roll(pick[1])]];
    extra.push(`Slog 50 %: ${pick[0]}`);
  }
  if (e.d6) extra.push(`d6 = ${d(6)}`);
  log(`Slumpmöte (${night ? "natt" : "dag"}): d12+d8 = ${r} → ${e.title}`, "ok");
  showResult(`${night ? "Natt" : "Dag"} ${r}: ${e.title}`, e.text, creatures, extra);
}

function checkEncounter() {
  const road = $("#encWhere").value === "road";
  const need = road ? ENCOUNTER_RULES.road : ENCOUNTER_RULES.wilderness;
  const r = d(20);
  if (r < need) {
    log(`Möteskontroll (${road ? "väg" : "vildmark"}): d20 = ${r}, behövde ${need}+ → inget möte.`);
    showResult(`Inget möte (d20 = ${r})`, `Slå igen efter ${ENCOUNTER_RULES.everyMinutes} minuter i spelet. ${ENCOUNTER_RULES.note}`, []);
    return;
  }
  log(`Möteskontroll: d20 = ${r} → möte!`, "ok");
  rollTable();
}

function rollHouse() {
  const r = d(20);
  const e = HOUSES.find((h) => r >= h.min && r <= h.max);
  const creatures = (e.creatures || []).map(([n, ex]) => [n, roll(ex)]);
  const extra = e.extra ? [`${roll(e.extra[1])} × ${e.extra[0]}`] : [];
  log(`Husets invånare: d20 = ${r} → ${e.title}`, "ok");
  showResult(`Hus, d20 = ${r}: ${e.title}`, e.text, creatures, extra);
}

function freeMonster() {
  const name = $("#freeMonster").value;
  const n = Math.max(1, Math.min(30, parseInt($("#freeCount").value, 10) || 1));
  placeAtView([[name, n]], `${n} × ${name}`);
}

// ---------- Start ----------

OBR.onReady(async () => {
  const role = await OBR.player.getRole();
  if (role !== "GM") {
    document.body.innerHTML = "<p class='pad'>CoS Prep är bara för spelledaren.</p>";
    return;
  }
  const sel = $("#location");
  LOCATIONS.forEach((l) => {
    const o = document.createElement("option");
    o.value = l.id;
    o.textContent = l.title;
    sel.appendChild(o);
  });
  sel.addEventListener("change", renderLocation);
  $("#pickBtn").addEventListener("click", pickImages);
  $("#placeBtn").addEventListener("click", place);
  $("#removeBtn").addEventListener("click", removePlaced);
  $("#verifyBtn").addEventListener("click", verify);
  $("#playersBtn").addEventListener("click", showPlayers);
  $("#syncBtn").addEventListener("click", syncPlayers);
  $("#encCheckBtn").addEventListener("click", checkEncounter);
  $("#encTableBtn").addEventListener("click", rollTable);
  $("#houseBtn").addEventListener("click", rollHouse);
  $("#encPlaceBtn").addEventListener("click", () => lastGroup && placeAtView(lastGroup.creatures, lastGroup.label));
  $("#encRemoveBtn").addEventListener("click", removeLastPlaced);
  $("#freeBtn").addEventListener("click", freeMonster);
  await loadTokenMap();
  OBR.room.onMetadataChange((m) => { tokenMap = m[TOKENS_KEY] || {}; renderTokenStatus(); });
  const ready = await OBR.scene.isReady();
  if (ready) renderLocation();
  OBR.scene.onReadyChange((r) => r && renderLocation());
});

window.addEventListener("error", (e) => log("JS-fel: " + e.message, "warn"));
window.addEventListener("unhandledrejection", (e) => log("Fel: " + (e.reason?.message || e.reason), "warn"));
