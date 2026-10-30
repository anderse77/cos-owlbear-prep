import OBR, { buildImage, buildLabel, buildPath, buildShape } from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.1.0/+esm";
import { MONSTERS, LOCATIONS } from "./locations.js?v=153";
import { PLAYERS, PLAYERS_UPDATED } from "./players.js?v=153";
import { DAY, NIGHT, HOUSES, ENCOUNTER_RULES } from "./encounters.js?v=153";
import { PLACES, travel, OVERVIEW, bookToOverview, PX_PER_MILE_OVERVIEW, MPH, ROAD_FACTOR } from "./explore.js?v=153";

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
  const norm = (x) => String(x || "").toLowerCase().replace(/[^a-z]+/g, "");
  let matched = 0;
  const unknown = [];
  picked.forEach((p) => {
    const name = names.find((n) => norm(n) === norm(p.name));
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
    picked = await OBR.assets.downloadImages(false, name.replace(/[^A-Za-z]+/g, " ").trim(), "CHARACTER");
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

// Väljer automatiskt den plats vars kartnamn (mapHint) finns i scenens karta.
async function autoSelectLocation() {
  try {
    const maps = await OBR.scene.items.getItems((i) => i.layer === "MAP");
    const names = maps.map((m) => (m.name || "").toUpperCase());
    const loc = LOCATIONS.find((l) => l.mapHint && names.some((n) => n.includes(l.mapHint)));
    if (loc && $("#location").value !== loc.id) {
      $("#location").value = loc.id;
      log(`Scenen passar platsen "${loc.title}" – vald automatiskt.`, "ok");
    }
    if (!loc && names.length) {
      const msg = "Ingen plats i listan hör till den här kartan – här finns inga fasta monster att placera.";
      $("#placedInfo").textContent = msg;
      log(`${maps[0].name}: ${msg}`, "warn");
    }
  } catch (e) { console.warn(e); }
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
  log(bad ? `${bad} token(s) avviker från planen. "Flytta till planerade rutor" rättar dem (HP och dolt/synligt behålls).` : `Alla ${items.length} tokens står på planerade rutor.`, bad ? "warn" : "ok");
}

// Flyttar redan placerade monster till rutorna i planen (t.ex. efter att placeringen rättats i en ny version).
async function moveToPlan() {
  const loc = currentLocation();
  const items = await placedItems(loc.id);
  if (!items.length) { log("Inget placerat att flytta.", ""); return; }
  const map = await findMap();
  if (!map) { log("Hittar ingen karta i scenen.", "warn"); return; }
  const expected = {};
  loc.groups.forEach((g) => g.tokens.forEach((t) => (expected[t.name] = { cell: t.cell, size: MONSTERS[g.monster].size })));
  const pos = {};
  for (const i of items) {
    const e = expected[i.name];
    if (e) pos[i.id] = await cellToScene(map, loc, e.cell, e.size);
  }
  const moved = items.filter((i) => pos[i.id] && (Math.abs(pos[i.id].x - i.position.x) > 1 || Math.abs(pos[i.id].y - i.position.y) > 1));
  if (!moved.length) { log("Alla står redan på planerade rutor.", "ok"); return; }
  await OBR.scene.items.updateItems(moved.map((i) => i.id), (list) => list.forEach((i) => { i.position = pos[i.id]; }));
  log(`Flyttade ${moved.length}: ${moved.map((i) => i.name).join(", ")}.`, "ok");
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


// ---------- Resa och utforskning ----------

const PARTY_KEY = `${ID}/party`;

function fillPlaces() {
  for (const id of ["#tripFrom", "#tripTo"]) {
    const sel = $(id);
    PLACES.forEach((p) => { const o = document.createElement("option"); o.value = p.id; o.textContent = p.name; sel.appendChild(o); });
  }
  $("#tripFrom").value = "E"; $("#tripTo").value = "F";
  showTrip();
}

function showTrip() {
  const t = travel($("#tripFrom").value, $("#tripTo").value);
  const from = $("#tripFrom").value, to = $("#tripTo").value;
  if (from === to) { $("#tripInfo").innerHTML = "<b>Välj en annan Till-plats</b> – Från och Till är samma."; return; }
  const min = Math.round(t.minutes / 10) * 10;
  const tid = min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min} min`;
  const road = $("#encWhere").value === "road";
  $("#tripInfo").innerHTML = `<b>${from} → ${to}: ca ${t.road.toFixed(1)} mi, ${tid} till fots</b><br>` +
    `${t.checks} mötesslag (ett per halvtimme), möte på ${road ? "18–20" : "15–20"}. Fågelväg ${t.crow.toFixed(1)} mi. Ungefärligt.`;
}

let tripEncounters = [];

function rollTrip() {
  const t = travel($("#tripFrom").value, $("#tripTo").value);
  const road = $("#encWhere").value === "road";
  const need = road ? ENCOUNTER_RULES.road : ENCOUNTER_RULES.wilderness;
  const night = $("#encTime").value === "night";
  const lines = [];
  tripEncounters = [];
  for (let i = 1; i <= t.checks; i++) {
    const r = d(20);
    if (tripEncounters.length >= 2) { lines.push(`${i * 30} min: (redan två möten – inget slag enligt boken)`); continue; }
    if (r < need) { lines.push(`${i * 30} min: d20 ${r} – inget`); continue; }
    const tr = d(12) + d(8);
    const e = (night ? NIGHT : DAY)[tr];
    let creatures = (e.creatures || []).map(([n, ex]) => [n, roll(ex)]);
    if (e.split) { const pick = d(2) === 1 ? e.split[0] : e.split[1]; creatures = [[pick[0], roll(pick[1])]]; }
    tripEncounters.push({ title: e.title, text: e.text, creatures, at: i * 30 });
    lines.push(`<b>${i * 30} min: d20 ${r} → MÖTE: ${e.title}</b> (${creatures.filter(([, n]) => n).map(([n, c]) => `${c} × ${n}`).join(", ") || "inga varelser"})`);
  }
  const box = $("#encResult");
  box.innerHTML = `<b>Resa ${$("#tripFrom").value} → ${$("#tripTo").value} (${night ? "natt" : "dag"}, ${road ? "väg" : "vildmark"})</b><div>${lines.join("<br>")}</div>` +
    tripEncounters.map((m, k) => `<div class="note">Möte ${k + 1}: ${m.text}</div>`).join("");
  if (tripEncounters.length) { lastGroup = { creatures: tripEncounters[0].creatures, label: tripEncounters[0].title }; $("#encPlaceBtn").disabled = !tripEncounters[0].creatures.some(([, n]) => n); }
  else { lastGroup = null; $("#encPlaceBtn").disabled = true; }
  log(`Resa ${$("#tripFrom").value}→${$("#tripTo").value}: ${t.checks} slag, ${tripEncounters.length} möte(n).${tripEncounters.length > 1 ? " Placera-knappen tar möte 1; slå om möte 2 när det inträffar eller använd Valfritt monster." : ""}`, "ok");
}

async function overviewMap() {
  const maps = await OBR.scene.items.getItems((i) => i.layer === "MAP" && i.type === "IMAGE");
  const m = maps.find((x) => (x.name || "").toUpperCase().includes(OVERVIEW.hint)) ||
    maps.find((x) => x.image.width === OVERVIEW.width && x.image.height === OVERVIEW.height && /BAROVIA/i.test(x.name || ""));
  if (!m) { log('Öppna scenen "00 Barovia – hela dalen" först.', "warn"); return null; }
  return m;
}

async function overviewToScene(map, [px, py]) {
  const dpi = await OBR.scene.grid.getDpi();
  const kx = (dpi / map.grid.dpi) * map.scale.x, ky = (dpi / map.grid.dpi) * map.scale.y;
  return { pos: { x: map.position.x + (px - map.grid.offset.x) * kx, y: map.position.y + (py - map.grid.offset.y) * ky }, k: (kx + ky) / 2 };
}

async function moveParty() {
  const map = await overviewMap(); if (!map) return;
  const place = PLACES.find((p) => p.id === $("#tripTo").value);
  const { pos } = await overviewToScene(map, bookToOverview(place.book));
  const existing = await OBR.scene.items.getItems((i) => i.metadata?.[PARTY_KEY]);
  if (existing.length) {
    await OBR.scene.items.updateItems(existing.map((i) => i.id), (list) => list.forEach((i) => { i.position = pos; }));
    log(`Gruppmarkören flyttad till ${place.name}.`, "ok");
  } else {
    const label = buildLabel().plainText("Sällskapet").backgroundColor("#8b1a1a").fontSize(24).position(pos).layer("TEXT").locked(false).visible(true)
      .metadata({ [PARTY_KEY]: true }).build();
    await OBR.scene.items.addItems([label]);
    log(`Gruppmarkör ("Sällskapet") placerad vid ${place.name}. Dra den fritt; knappen flyttar den till Till-platsen.`, "ok");
  }
  $("#tripFrom").value = place.id; showTrip();
}

// Avslöja: kopierar en dimform som du själv har skurit ("Cut") och lägger en ny cirkel runt markören.
// Owlbear: en dimform med visible=false är ett HÅL i dimman ("Cut"). Vi ritar alltid ett eget hål,
// oberoende av hur andra dimformer är ritade.
// Hål formad som en "kapsel" från c till end (eller en cirkel om end saknas), radie = miles.
async function revealCircle(c, miles, end = null) {
  const map = await overviewMap(); if (!map) return;
  const { k } = await overviewToScene(map, [0, 0]);
  const r = miles * PX_PER_MILE_OVERVIEW * k;
  const ex = end ? end.x - c.x : 0, ey = end ? end.y - c.y : 0;
  const th = Math.atan2(ey, ex), n = 18, pts = [];
  for (let i = 0; i <= n; i++) { const a = th - Math.PI / 2 + (i / n) * Math.PI; pts.push([ex + Math.cos(a) * r, ey + Math.sin(a) * r]); }
  for (let i = 0; i <= n; i++) { const a = th + Math.PI / 2 + (i / n) * Math.PI; pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
  const cmds = pts.map(([x, y], i) => [i ? 1 : 0, x, y]);
  cmds.push([5]);
  let color = "#0e0f16";
  try { color = await OBR.scene.fog.getColor(); } catch {}
  const item = buildPath().commands(cmds).fillRule("nonzero").position(c).layer("FOG")
    .fillColor(color).fillOpacity(1).strokeColor(color).strokeOpacity(1).strokeWidth(0)
    .visible(false).locked(true).name("Avslöjat runt sällskapet")
    .metadata({ [`${ID}/reveal`]: true }).build();
  await OBR.scene.items.addItems([item]);
  // Äldre avslöjanden (v1.3.0–1.3.2) blev dimma i stället för hål – gör om dem till hål.
  const old = await OBR.scene.items.getItems((i) => i.layer === "FOG" && i.metadata?.[`${ID}/reveal`] && i.visible);
  if (old.length) {
    await OBR.scene.items.updateItems(old.map((i) => i.id), (list) => list.forEach((i) => { i.visible = false; }));
    log(`Rättade ${old.length} äldre avslöjande(n) som hade blivit dimma i stället för hål.`, "ok");
  }
}

async function revealAroundParty() {
  const party = (await OBR.scene.items.getItems((i) => i.metadata?.[PARTY_KEY]))[0];
  if (!party) { log("Placera gruppmarkören först (Flytta sällskapet …).", "warn"); return; }
  const miles = parseFloat($("#revealMiles").value) || 0.5;
  await revealCircle(party.position, miles);
  log(`Avslöjade ${miles} mile runt sällskapet. Ser det fel ut: ångra (Ctrl+Z).`, "ok");
}

// Återställer översiktskartan: tar bort alla dimformer (hål) och gruppmarkören, så att hela dalen är dold igen.
let confirmReset = false;
async function resetOverview() {
  const map = await overviewMap(); if (!map) return;
  const fog = await OBR.scene.items.getItems((i) => i.layer === "FOG");
  const party = await OBR.scene.items.getItems((i) => i.metadata?.[PARTY_KEY]);
  const ids = [...fog, ...party].map((i) => i.id);
  if (!ids.length) { log("Kartan är redan återställd."); return; }
  if (!confirmReset) {
    confirmReset = true;
    $("#resetBtn").textContent = `Säker? Tar bort ${fog.length} dimformer + markören – klicka igen`;
    setTimeout(() => { confirmReset = false; $("#resetBtn").textContent = "Återställ kartan (all dimma tillbaka)"; }, 5000);
    return;
  }
  confirmReset = false;
  $("#resetBtn").textContent = "Återställ kartan (all dimma tillbaka)";
  await OBR.scene.items.deleteItems(ids);
  log(`Kartan återställd: tog bort ${fog.length} dimformer och gruppmarkören. Hela dalen är dold igen.`, "ok");
}

// Går en halvtimme (1,5 mile längs vägen, 3 mph) mot Till-platsen, avslöjar och slår för möte.
async function stepHalfHour() {
  const map = await overviewMap(); if (!map) return;
  const to = PLACES.find((p) => p.id === $("#tripTo").value);
  const { pos: target, k } = await overviewToScene(map, bookToOverview(to.book));
  let party = (await OBR.scene.items.getItems((i) => i.metadata?.[PARTY_KEY]))[0];
  if (!party) {
    const from = PLACES.find((p) => p.id === $("#tripFrom").value);
    const { pos } = await overviewToScene(map, bookToOverview(from.book));
    const label = buildLabel().plainText("Sällskapet").backgroundColor("#8b1a1a").fontSize(24).position(pos).layer("TEXT").locked(false).visible(true)
      .metadata({ [PARTY_KEY]: true, [`${ID}/minutes`]: 0 }).build();
    await OBR.scene.items.addItems([label]);
    await revealCircle(pos, parseFloat($("#revealMiles").value) || 0.5);
    party = label;
    log(`Gruppmarkör placerad vid ${from.name}.`, "ok");
  }
  const pxPerMile = PX_PER_MILE_OVERVIEW * k;
  const stepCrow = (MPH * 0.5) / ROAD_FACTOR; // 1,5 mile längs vägen ≈ 1,15 mile fågelväg
  const dx = target.x - party.position.x, dy = target.y - party.position.y;
  const dist = Math.hypot(dx, dy) / pxPerMile;
  const arrived = dist <= stepCrow;
  const f = arrived ? 1 : stepCrow / dist;
  const pos = { x: party.position.x + dx * f, y: party.position.y + dy * f };
  const minutes = (party.metadata?.[`${ID}/minutes`] || 0) + 30;
  await OBR.scene.items.updateItems([party.id], (list) => list.forEach((i) => {
    i.position = pos;
    i.metadata[`${ID}/minutes`] = arrived ? 0 : minutes;
  }));
  await revealCircle(party.position, parseFloat($("#revealMiles").value) || 0.5, pos); // hela sträckan de gick
  const left = Math.max(0, dist - stepCrow) * ROAD_FACTOR;
  const h = Math.floor(minutes / 60), m = minutes % 60;
  log(arrived
    ? `Framme vid ${to.name} efter ${h ? h + " h " : ""}${m} min. Välj nästa Till-plats.`
    : `En halvtimme till (${h ? h + " h " : ""}${m} min hittills). Kvar till ${to.id}: ca ${left.toFixed(1)} mi.`, "ok");
  if (arrived) { $("#tripFrom").value = to.id; showTrip(); }
  checkEncounter();
}
async function dumpFog() {
  const fog = await OBR.scene.items.getItems((i) => i.layer === "FOG");
  if (!fog.length) { log("Inga dimformer i scenen."); return; }
  fog.slice(-3).forEach((i) => {
    const c = { ...i };
    if (c.commands) c.commands = `${c.commands.length} kommandon`;
    delete c.id; delete c.createdUserId; delete c.lastModifiedUserId; delete c.lastModified; delete c.position; delete c.scale;
    Object.entries(c).reverse().forEach(([k, v]) => log(`  ${k}: ${JSON.stringify(v)}`));
    log(`Dimform "${i.name}" (${i.type}):`, "ok");
  });
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
  $("#moveBtn").addEventListener("click", moveToPlan);
  $("#playersBtn").addEventListener("click", showPlayers);
  $("#syncBtn").addEventListener("click", syncPlayers);
  $("#autoLogBtn").addEventListener("click", async () => {
    const lines = (await OBR.scene.getMetadata())[`${ID}/autolink-log`] || [];
    if (!lines.length) log("Inga automatiska kopplingar i den här scenen än.", "");
    lines.slice().reverse().forEach((l) => log(l, "ok"));
  });
  $("#encCheckBtn").addEventListener("click", checkEncounter);
  $("#encTableBtn").addEventListener("click", rollTable);
  $("#houseBtn").addEventListener("click", rollHouse);
  $("#encPlaceBtn").addEventListener("click", () => lastGroup && placeAtView(lastGroup.creatures, lastGroup.label));
  $("#encRemoveBtn").addEventListener("click", removeLastPlaced);
  $("#freeBtn").addEventListener("click", freeMonster);
  fillPlaces();
  for (const id of ["#tripFrom", "#tripTo", "#encWhere", "#encTime"]) {
    $(id).addEventListener("change", showTrip);
    $(id).addEventListener("input", showTrip);
  }
  $("#tripRollBtn").addEventListener("click", rollTrip);
  $("#partyBtn").addEventListener("click", moveParty);
  $("#revealBtn").addEventListener("click", revealAroundParty);
  $("#stepBtn").addEventListener("click", stepHalfHour);
  $("#resetBtn").addEventListener("click", resetOverview);
  $("#fogDumpBtn").addEventListener("click", dumpFog);
  await loadTokenMap();
  OBR.room.onMetadataChange((m) => { tokenMap = m[TOKENS_KEY] || {}; renderTokenStatus(); });
  const ready = await OBR.scene.isReady();
  if (ready) { await autoSelectLocation(); renderLocation(); }
  OBR.scene.onReadyChange(async (r) => { if (r) { await autoSelectLocation(); renderLocation(); } });
});

window.addEventListener("error", (e) => log("JS-fel: " + e.message, "warn"));
window.addEventListener("unhandledrejection", (e) => log("Fel: " + (e.reason?.message || e.reason), "warn"));
