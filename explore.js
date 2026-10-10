// Resor i Barovia: bokens platser (kapitel 2, Map 2.1) och deras läge.
// book = mitten av platsens markering på bokens karta (5025×3225 px, en hex = 69 px = 1/4 mile).
// Avstånd räknas fågelvägen och multipliceras med ROAD_FACTOR för att vägarna slingrar (egen uppskattning).
export const HEX_PX = 69;
export const MILES_PER_HEX = 0.25;
export const ROAD_FACTOR = 1.3;
export const MPH = 3; // normal marschtakt till fots

// Översiktskartan "00 Barovia - hela dalen" (Beneos 31-02, 3840×2160) har samma upplägg som bokens karta.
// Omräkning bok → Beneos uppmätt från byn Barovia, Vallaki och Krezk (ungefärlig, ±1/4 mile).
export const OVERVIEW = { hint: "00 BAROVIA", width: 3840, height: 2160, ax: 0.7695, bx: 23, ay: 0.758, by: -138 };
export const bookToOverview = ([x, y]) => [OVERVIEW.ax * x + OVERVIEW.bx, OVERVIEW.ay * y + OVERVIEW.by];
export const PX_PER_MILE_OVERVIEW = (HEX_PX / MILES_PER_HEX) * OVERVIEW.ax;

export const PLACES = [
  { id: "A", name: "A. Old Svalich Road (dimman i öster)", book: [4824, 1821] },
  { id: "B", name: "B. Barovias grindar", book: [4694, 1722] },
  { id: "C", name: "C. Svalich Woods (Dalvans lik)", book: [4623, 1912] },
  { id: "E", name: "E. Byn Barovia", book: [3994, 1955] },
  { id: "F", name: "F. Korsningen vid Ivlis (galgen)", book: [3402, 2340] },
  { id: "G", name: "G. Tser Pool (Madam Eva)", book: [3246, 1954] },
  { id: "H", name: "H. Tser Falls", book: [3034, 1733] },
  { id: "J", name: "J. Ravenlofts portar", book: [3427, 1638] },
  { id: "K", name: "K. Castle Ravenloft", book: [3616, 1660] },
  { id: "N", name: "N. Vallaki", book: [2011, 1137] },
  { id: "O", name: "O. Old Bonegrinder", book: [2436, 1304] },
  { id: "L", name: "L. Lake Zarovich", book: [2090, 814] },
  { id: "M", name: "M. Mount Baratok (galne magikern)", book: [2295, 476] },
  { id: "P", name: "P. Korsningen vid Luna", book: [1775, 1172] },
  { id: "Q", name: "Q. Argynvostholt", book: [1662, 1580] },
  { id: "U", name: "U. Berez ruiner", book: [1659, 1934] },
  { id: "R", name: "R. Korsningen vid Raven", book: [1096, 1080] },
  { id: "V", name: "V. Van Richtens torn", book: [1262, 866] },
  { id: "W", name: "W. Wizard of Wines", book: [576, 1510] },
  { id: "S", name: "S. Krezk", book: [641, 989] },
  { id: "Y", name: "Y. Yester Hill", book: [350, 2009] },
  { id: "Z", name: "Z. Varulvslyan", book: [895, 731] },
  { id: "T", name: "T. Tsolenka Pass", book: [1240, 2452] },
  { id: "X", name: "X. Amber Temple", book: [1687, 2698] },
];

export function travel(fromId, toId) {
  const a = PLACES.find((p) => p.id === fromId), b = PLACES.find((p) => p.id === toId);
  const px = Math.hypot(a.book[0] - b.book[0], a.book[1] - b.book[1]);
  const crow = (px / HEX_PX) * MILES_PER_HEX;
  const road = crow * ROAD_FACTOR;
  const minutes = (road / MPH) * 60;
  const checks = Math.max(1, Math.round(minutes / 30));
  return { crow, road, minutes, checks };
}
