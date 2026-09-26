// Platser och monster. Positioner anges i RUTOR på Beneos-kartan (4K, 3840x2160, 120 px per ruta = 32x18).
// cell: [kolumn, rad] räknat från övre vänstra hörnet, 0-baserat. För Large (2x2) anges övre vänstra rutan.
// Källa för placering: Curse of Strahd, Appendix B (Death House), bokens DM-karta (X- och M-markeringar),
// översatt till Beneos-kartan som är vriden 90 grader jämfört med boken.

// Statblock i Tabletop Almanac. "slug" är exakt det Grimoire använder.
// fallback används bara om Tabletop Almanac inte svarar (t.ex. egna, privata statblock).
export const MONSTERS = {
  "Ghoul": { slug: "ghoul-wotcsrd", size: 1, fallback: { hp: 22, ac: 12, init: 2 } },
  "Ghast": { slug: "ghast-wotcsrd", size: 1, fallback: { hp: 36, ac: 13, init: 3 } },
  "Shadow": { slug: "shadow-wotcsrd", size: 1, fallback: { hp: 27, ac: 12, init: 2 } },
  "Mimic": { slug: "mimic-wotcsrd", size: 1, fallback: { hp: 58, ac: 12, init: 3 } },
  "Shambling Mound": { slug: "shamblingmound-wotcsrd", size: 2, fallback: { hp: 110, ac: 15, init: -1 } },
};

export const LOCATIONS = [
  {
    id: "deathhouse-b1",
    title: "Death House – Källare 1 (B1)",
    mapHint: "B1",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "29 Korsningen",
        note: "Reser sig ur golvet när någon når mitten av korsningen (bokens X).",
        monster: "Ghoul",
        tokens: [
          { name: "Ghoul 1", cell: [19, 5] },
          { name: "Ghoul 2", cell: [20, 4] },
          { name: "Ghoul 3", cell: [20, 6] },
          { name: "Ghoul 4", cell: [22, 6] },
        ],
      },
      {
        area: "31 Mörkerherrens helgedom",
        note: "Bildas runt statyn om någon rör statyn eller tar klotet.",
        monster: "Shadow",
        tokens: [
          { name: "Shadow 1", cell: [21, 0] },
          { name: "Shadow 2", cell: [23, 0] },
          { name: "Shadow 3", cell: [21, 1] },
          { name: "Shadow 4", cell: [22, 1] },
          { name: "Shadow 5", cell: [23, 1] },
        ],
      },
      {
        area: "33 Kultledarnas rum",
        note: "Dörren i sydvästra hörnet (bokens M) är en mimic.",
        monster: "Mimic",
        tokens: [{ name: "Mimic (dörren)", cell: [25, 4] }],
      },
      {
        area: "34 Kultledarnas sovrum",
        note: "Gömda i håligheter bakom väggarna (bokens X). Anfaller om något tas ur fotkistan.",
        monster: "Ghast",
        tokens: [
          { name: "Gustav Durst (Ghast)", cell: [23, 9] },
          { name: "Elisabeth Durst (Ghast)", cell: [25, 11] },
        ],
      },
    ],
  },
  {
    id: "deathhouse-b2",
    title: "Death House – Källare 2 (B2)",
    mapHint: "B2",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "38 Ritualkammaren",
        note: "Skräphögen i grottalkoven är Lorghoth. Sover tills den attackeras eller ritualen vägras.",
        monster: "Shambling Mound",
        tokens: [{ name: "Lorghoth (Shambling Mound)", cell: [24, 6] }],
      },
    ],
  },
];
