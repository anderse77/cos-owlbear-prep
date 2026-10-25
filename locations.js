// Platser och monster. Positioner anges i RUTOR på Beneos-kartan (4K, 3840x2160, 120 px per ruta = 32x18).
// cell: [kolumn, rad] räknat från övre vänstra hörnet, 0-baserat. För Large (2x2) anges övre vänstra rutan.
// Källa för placering: Curse of Strahd, Appendix B (Death House), bokens DM-karta (X- och M-markeringar),
// översatt till Beneos-kartan som är vriden 90 grader jämfört med boken.

// Statblock i Tabletop Almanac. "slug" är exakt det Grimoire använder.
// stats = värden hämtade från Tabletop Almanac (2026-09-27) och inbyggda, eftersom TA:s API inte tillåter
// anrop från andra webbplatser. Grimoire läser själv in hela statblocket via "slug".
export const MONSTERS = {
  "Ghoul": { slug: "ghoul-wotcsrd", size: 1, stats: { hp: 22, ac: 12, init: 2, limits: [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}] } },
  "Ghast": { slug: "ghast-wotcsrd", size: 1, stats: { hp: 36, ac: 13, init: 3, limits: [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}] } },
  "Shadow": { slug: "shadow-wotcsrd", size: 1, stats: { hp: 27, ac: 12, init: 2, limits: [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Bonus", "max": 1, "used": 0, "resets": ["Round"], "formula": null}] } },
  "Mimic": { slug: "mimic-wotcsrd", size: 1, stats: { hp: 58, ac: 12, init: 3, limits: [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Bonus", "max": 1, "used": 0, "resets": ["Round"], "formula": null}] } },
  "Shambling Mound": { slug: "shamblingmound-wotcsrd", size: 2, stats: { hp: 110, ac: 15, init: -1, limits: [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Multiattack", "max": 3, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Multiattack", "max": 3, "used": 0, "resets": ["Round"], "formula": null}] } },
  // --- Barovia: byn och vägarna (kapitel 2 och 3). 2024-statblock från TA (hämtade 2026-10-10). ---
  // custom: true = eget statblock i TA med bokens 2014-värden (ingen 2024-version finns).
  "Commoner": { slug: "commoner-wotcsrd", size: 1, stats: {"hp":4,"ac":10,"init":0,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Scout": { slug: "scout-wotcsrd", size: 1, stats: {"hp":16,"ac":13,"init":2,"limits":[{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Bandit": { slug: "bandit-wotcsrd", size: 1, stats: {"hp":11,"ac":12,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Swarm of Ravens": { slug: "swarmofravens-wotcsrd", size: 1, stats: {"hp":11,"ac":12,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":"1d6>5"},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Dire Wolf": { slug: "direwolf-wotcsrd", size: 2, stats: {"hp":22,"ac":14,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Wolf": { slug: "wolf-wotcsrd", size: 1, stats: {"hp":11,"ac":12,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Berserker": { slug: "berserker-wotcsrd", size: 1, stats: {"hp":67,"ac":13,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Werewolf": { slug: "werewolf-wotcsrd", size: 1, stats: {"hp":71,"ac":15,"init":4,"limits":[{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Bonus","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Druid": { slug: "druid-wotcsrd", size: 1, stats: {"hp":44,"ac":13,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Ghost": { slug: "ghost-wotcsrd", size: 1, stats: {"hp":45,"ac":11,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":"1d6>5"},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Swarm of Bats": { slug: "swarmofbats-wotcsrd", size: 2, stats: {"hp":11,"ac":12,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Zombie": { slug: "zombie-wotcsrd", size: 1, stats: {"hp":15,"ac":8,"init":-2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Will-o'-Wisp": { slug: "willowisp-wotcsrd", size: 1, stats: {"hp":27,"ac":19,"init":9,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Bonus","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Bonus","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Skeleton": { slug: "skeleton-wotcsrd", size: 1, stats: {"hp":13,"ac":14,"init":3,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Warhorse Skeleton": { slug: "warhorseskeleton-wotcsrd", size: 2, stats: {"hp":22,"ac":13,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Swarm of Rats": { slug: "swarmofrats-wotcsrd", size: 1, stats: {"hp":14,"ac":10,"init":0,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Vampire Spawn": { slug: "vampirespawn-wotcsrd", size: 1, stats: {"hp":90,"ac":16,"init":3,"limits":[{"id":"Multiattack","max":3,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":3,"used":0,"resets":["Round"],"formula":null},{"id":"Bonus","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":3,"used":0,"resets":["Round"],"formula":null}]} },
  "Night Hag": { slug: "nighthag-wotcsrd", size: 1, stats: {"hp":112,"ac":17,"init":5,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Nightmare Haunting","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Bonus","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Strahd Zombie": { slug: "strahdzombie-anderse77", size: 1, custom: true, stats: {"hp":30,"ac":8,"init":-2,"limits":[{"id":"Multiattack","max":3,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":3,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":3,"used":0,"resets":["Round"],"formula":null}]} },
  "Twig Blight": { slug: "twigblight-anderse77", size: 1, custom: true, stats: {"hp":4,"ac":13,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Needle Blight": { slug: "needleblight-anderse77", size: 1, custom: true, stats: {"hp":11,"ac":12,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Scarecrow": { slug: "scarecrow-anderse77", size: 1, custom: true, stats: {"hp":36,"ac":11,"init":1,"limits":[{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Revenant": { slug: "revenant-anderse77", size: 1, custom: true, stats: {"hp":136,"ac":13,"init":2,"limits":[{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Wereraven": { slug: "wereraven-anderse77", size: 1, custom: true, stats: {"hp":31,"ac":12,"init":2,"limits":[{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  // --- Vägen västerut (kapitel 2 och 3): E2, G. 2024-statblock från TA (hämtade 2026-10-25). ---
  "Bandit Captain": { slug: "banditcaptain-wotcsrd", size: 1, stats: {"hp":52,"ac":15,"init":3,"limits":[{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Spy": { slug: "spy-wotcsrd", size: 1, stats: {"hp":27,"ac":12,"init":4,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Bonus","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Warrior Veteran": { slug: "warriorveteran-wotcsrd", size: 1, stats: {"hp":65,"ac":17,"init":3,"limits":[{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Reaction","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Draft Horse": { slug: "drafthorse-wotcsrd", size: 2, stats: {"hp":15,"ac":10,"init":0,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Madam Eva": { slug: "madameva-anderse77", size: 1, custom: true, stats: {"hp":88,"ac":10,"init":0,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Curse","max":1,"used":0,"resets":["Long Rest"],"formula":null},{"id":"Evil Eye","max":1,"used":0,"resets":["Short Rest","Long Rest"],"formula":null},{"id":"Spell slot 1","max":4,"used":0,"resets":["Long Rest"],"formula":null},{"id":"Spell slot 2","max":3,"used":0,"resets":["Long Rest"],"formula":null},{"id":"Spell slot 3","max":3,"used":0,"resets":["Long Rest"],"formula":null},{"id":"Spell slot 4","max":3,"used":0,"resets":["Long Rest"],"formula":null},{"id":"Spell slot 5","max":2,"used":0,"resets":["Long Rest"],"formula":null},{"id":"Spell slot 6","max":1,"used":0,"resets":["Long Rest"],"formula":null},{"id":"Spell slot 7","max":1,"used":0,"resets":["Long Rest"],"formula":null},{"id":"Spell slot 8","max":1,"used":0,"resets":["Long Rest"],"formula":null}]} },
};

// map.origin = första rutlinjen i pixlar [x, y] när rutnätet inte börjar i hörnet.
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
  {
    id: "barovia-church-undercroft",
    title: "Barovia – kyrkans källare (E5g)",
    mapHint: "DORU",
    map: { width: 3840, height: 2160, cell: 107, origin: [57, 2] },
    groups: [
      {
        area: "E5g Kyrkans källare",
        note: "Doru, Donavichs son (vampire spawn), i bortre hörnet från trappan. Svältande; anfaller en ensam karaktär, undviker en samlad grupp men anfaller om han blir instängd.",
        monster: "Vampire Spawn",
        tokens: [{ name: "Doru (Vampire Spawn)", cell: [11, 6] }],
      },
    ],
  },
  {
    id: "barovia-blood-on-the-vine",
    title: "Barovia – Blood on the Vine (E2)",
    mapHint: "BLOOD",
    map: { width: 4400, height: 4400, cell: 200 },
    groups: [
      {
        area: "E2 Bardisken",
        note: "Arik Lorensk, bartendern. Torkar glas mekaniskt, tar beställningar (vin 1 cp glaset, 1 sp kannan), ignorerar alla frågor.",
        monster: "Commoner",
        tokens: [{ name: "Arik (Commoner)", cell: [6, 17] }],
      },
      {
        area: "E2 Bordet vid ytterdörren",
        note: "Alenka, Mirabel och Sorvia (Vistana Spy) äger tavernan. Ser till att notan betalas, bryr sig annars inte. Kommer gruppen med andra Vistani: pratsamma och tipsar om Madam Eva.",
        monster: "Spy",
        tokens: [
          { name: "Alenka (Spy)", cell: [9, 11] },
          { name: "Mirabel (Spy)", cell: [10, 11] },
          { name: "Sorvia (Spy)", cell: [10, 13] },
        ],
      },
      {
        area: "E2 Hörnbordet",
        note: "Ismark Kolyanovich (Veteran) sitter ensam. Bjuder på vin och ber om hjälp att föra Ireena till Vallaki; tar dem till borgmästarens hus (E4).",
        monster: "Warrior Veteran",
        tokens: [{ name: "Ismark (Veteran)", cell: [16, 12] }],
      },
    ],
  },
  {
    id: "tser-pool-camp",
    title: "Tser Pool – vistanilägret (G)",
    mapHint: "TSER POOL",
    map: { width: 3840, height: 2160, cell: 80 },
    groups: [
      {
        area: "G Kring elden",
        note: "12 berusade Vistani (Vistana Bandit): nackdel på attacker och färdighetsslag. Anfaller bara om de hotas eller förolämpas; annars vin och fest.",
        monster: "Bandit",
        tokens: [
          [22, 6], [23, 7], [24, 8], [25, 9], [27, 9], [28, 8], [29, 9], [21, 7], [22, 8], [24, 6], [23, 9], [28, 10],
        ].map((cell, i) => ({ name: `Vistana ${i + 1} (Bandit)`, cell })),
      },
      {
        area: "G Vagnarna",
        note: "3 nyktra Vistani (Vistana Bandit Captain) vilar i tre av vagnarna; rusar ut om larm går.",
        monster: "Bandit Captain",
        tokens: [
          { name: "Vistana-kapten 1", cell: [13, 13] },
          { name: "Vistana-kapten 2", cell: [33, 14] },
          { name: "Vistana-kapten 3", cell: [24, 3] },
        ],
      },
      {
        area: "G Det stora tältet",
        note: "Madam Eva läser tarokka-korten (kapitel 1). Ger aldrig hjälp och ber aldrig om någon. Sökning i tält/vagn: slå på bokens skattabell.",
        monster: "Madam Eva",
        tokens: [{ name: "Madam Eva", cell: [23, 13] }],
      },
      {
        area: "G Hästarna",
        note: "8 draghästar dricker vid floden (floden syns inte på Beneos-kartan – flytta dem till kanten mot sjön). Skräms inte lätt.",
        monster: "Draft Horse",
        tokens: [[36, 17], [38, 17], [40, 17], [42, 17], [36, 20], [38, 20], [40, 20], [42, 20]].map((cell, i) => ({ name: `Draghäst ${i + 1}`, cell })),
      },
    ],
  },
];
