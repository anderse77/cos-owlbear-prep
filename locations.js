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
  // --- Unika CoS-figurer (egna statblock, bokens 2014-värden, uppladdade 2026-10-28). ---
  "Strahd von Zarovich": { slug: "strahdvonzarovich-anderse77", size: 1, custom: true, stats: {"hp": 144, "ac": 16, "init": 4, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Children of the Night", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Legendary Resistance", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 1", "max": 4, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 2", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 3", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 4", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 5", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Legendary Actions", "max": 3, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Rahadin": { slug: "rahadin-anderse77", size: 1, custom: true, stats: {"hp": 135, "ac": 18, "init": 6, "limits": [{"id": "Multiattack", "max": 3, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Innate 1/day", "max": 2, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Innate 3/day", "max": 6, "used": 0, "resets": ["Long Rest"], "formula": null}]} },
  "Vladimir Horngaard": { slug: "vladimirhorngaard-anderse77", size: 1, custom: true, stats: {"hp": 192, "ac": 17, "init": 2, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Baba Lysaga": { slug: "babalysaga-anderse77", size: 1, custom: true, stats: {"hp": 120, "ac": 15, "init": 0, "limits": [{"id": "Multiattack", "max": 3, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Summon Swarms of Insects", "max": 1, "used": 0, "resets": ["Short Rest", "Long Rest"], "formula": null}, {"id": "Spell slot 1", "max": 4, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 2", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 3", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 4", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 5", "max": 2, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 6", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 7", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 8", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}]} },
  "Baba Lysaga's Creeping Hut": { slug: "babalysagascreepinghut-anderse77", size: 4, custom: true, stats: {"hp": 263, "ac": 16, "init": -2, "limits": [{"id": "Multiattack", "max": 3, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Izek Strazni": { slug: "izekstrazni-anderse77", size: 1, custom: true, stats: {"hp": 112, "ac": 14, "init": 2, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Ezmerelda d'Avenir": { slug: "ezmereldadavenir-anderse77", size: 1, custom: true, stats: {"hp": 82, "ac": 17, "init": 4, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Curse", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Evil Eye", "max": 1, "used": 0, "resets": ["Short Rest", "Long Rest"], "formula": null}, {"id": "Spell slot 1", "max": 4, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 2", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 3", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 4", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}]} },
  "Rictavio": { slug: "rictavio-anderse77", size: 1, custom: true, stats: {"hp": 77, "ac": 12, "init": 1, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Spell slot 1", "max": 4, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 2", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 3", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 4", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 5", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}]} },
  "Mongrelfolk": { slug: "mongrelfolk-anderse77", size: 1, custom: true, stats: {"hp": 26, "ac": 11, "init": -1, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Phantom Warrior": { slug: "phantomwarrior-anderse77", size: 1, custom: true, stats: {"hp": 45, "ac": 16, "init": 0, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Barovian Witch": { slug: "barovianwitch-anderse77", size: 1, custom: true, stats: {"hp": 16, "ac": 10, "init": 0, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Spell slot 1", "max": 4, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 2", "max": 2, "used": 0, "resets": ["Long Rest"], "formula": null}]} },
  "Guardian Portrait": { slug: "guardianportrait-anderse77", size: 1, custom: true, stats: {"hp": 22, "ac": 5, "init": -5, "limits": [{"id": "Innate 3/day", "max": 12, "used": 0, "resets": ["Long Rest"], "formula": null}]} },
  "Pidlwick II": { slug: "pidlwickii-anderse77", size: 1, custom: true, stats: {"hp": 10, "ac": 14, "init": 2, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Tree Blight": { slug: "treeblight-anderse77", size: 3, custom: true, stats: {"hp": 92, "ac": 15, "init": 0, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}]} },
  // --- Old Bonegrinder (kapitel 6). ---
  "Dretch": { slug: "dretch-wotcsrd", size: 1, stats: {"hp":18,"ac":11,"init":0,"limits":[{"id":"Fetid Cloud","max":1,"used":0,"resets":["Day"],"formula":null},{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  // --- Vallaki (kapitel 5). 2024-statblock från TA (hämtade 2026-10-29). ---
  "Guard": { slug: "guard-wotcsrd", size: 1, stats: {"hp":11,"ac":16,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Noble": { slug: "noble-wotcsrd", size: 1, stats: {"hp":9,"ac":15,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Reaction","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Priest": { slug: "priest-wotcsrd", size: 1, stats: {"hp":38,"ac":13,"init":0,"limits":[{"id":"Action","max":2,"used":0,"resets":["Round"],"formula":null},{"id":"Spellcasting","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Divine Aid","max":3,"used":0,"resets":["Day"],"formula":null}]} },
  "Mage": { slug: "mage-wotcsrd", size: 1, stats: {"hp":81,"ac":15,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":3,"used":0,"resets":["Round"],"formula":null},{"id":"Protective Magic","max":3,"used":0,"resets":["Day"],"formula":null},{"id":"Misty Step","max":3,"used":0,"resets":["Day"],"formula":null}]} },
  "Cultist": { slug: "cultist-wotcsrd", size: 1, stats: {"hp":9,"ac":12,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Cult Fanatic": { slug: "cultistfanatic-wotcsrd", size: 1, stats: {"hp":44,"ac":13,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Spiritual Weapon","max":2,"used":0,"resets":["Day"],"formula":null}]} },
  "Assassin": { slug: "assassin-wotcsrd", size: 1, stats: {"hp":97,"ac":16,"init":10,"limits":[{"id":"Multiattack","max":3,"used":0,"resets":["Round"],"formula":null}]} },
  "Mastiff": { slug: "mastiff-wotcsrd", size: 1, stats: {"hp":5,"ac":12,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Riding Horse": { slug: "ridinghorse-wotcsrd", size: 2, stats: {"hp":13,"ac":11,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Archmage": { slug: "archmage-wotcsrd", size: 1, stats: {"hp":170,"ac":17,"init":7,"limits":[{"id":"Spellcasting","max":1,"used":0,"resets":["Round"],"formula":null},{"id":"Multiattack","max":4,"used":0,"resets":["Round"],"formula":null},{"id":"Protective Magic","max":3,"used":0,"resets":["Day"],"formula":null},{"id":"Misty Step","max":3,"used":0,"resets":["Day"],"formula":null}]} },
  "Guard Captain": { slug: "guardcaptain-wotcsrd", size: 1, stats: {"hp":75,"ac":18,"init":4,"limits":[{"id":"Multiattack","max":2,"used":0,"resets":["Round"],"formula":null}]} },
  "Tough": { slug: "tough-wotcsrd", size: 1, stats: {"hp":32,"ac":12,"init":1,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Armored Saber-Toothed Tiger": { slug: "armoredsabertoothedtiger-anderse77", size: 2, custom: true, stats: {"hp":84,"ac":17,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Cat": { slug: "cat-wotcsrd", size: 1, stats: {"hp":2,"ac":12,"init":2,"limits":[{"id":"Action","max":1,"used":0,"resets":["Round"],"formula":null}]} },
  "Baboon": { slug: "baboon-wotcsrd", size: 1, stats: {"hp":3,"ac":12,"init":2,"limits":[]} },
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
        tokens: [{ name: "Doru (Vampire Spawn)", cell: [12, 7] }],
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
    mapHint: "LAGRET VID SJON",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "G Kring elden",
        note: "12 berusade Vistani (Vistana Bandit): nackdel på attacker och färdighetsslag. Anfaller bara om de hotas eller förolämpas; annars vin och fest. En av dem berättar om magikern som Strahd kastade nerför Tser Falls.",
        monster: "Bandit",
        tokens: [[16, 8], [16, 9], [18, 10], [17, 11], [17, 12], [16, 13], [14, 10], [20, 12], [20, 11], [20, 9], [14, 13], [19, 8]].map((cell, i) => ({ name: `Vistana ${i + 1} (Bandit)`, cell })),
      },
      {
        area: "G Vagnarna",
        note: "3 nyktra Vistani (Vistana Bandit Captain) vilar i tre av de fyra vagnarna; rusar ut om larm går.",
        monster: "Bandit Captain",
        tokens: [
          { name: "Vistana-kapten 1", cell: [18, 7] },
          { name: "Vistana-kapten 2", cell: [12, 8] },
          { name: "Vistana-kapten 3", cell: [13, 15] },
        ],
      },
      {
        area: "G Madam Evas tält",
        note: "Det stora tältet vid sjön. Madam Eva läser tarokka-korten (kapitel 1). Ger aldrig hjälp och ber aldrig om någon. Sökning i tält/vagn: slå på bokens skattabell.",
        monster: "Madam Eva",
        tokens: [{ name: "Madam Eva", cell: [24, 6] }],
      },
      {
        area: "G Hästarna vid vattnet",
        note: "8 draghästar dricker vid sjön. Skräms inte lätt.",
        monster: "Draft Horse",
        tokens: [[2, 3], [7, 2], [19, 2], [21, 2], [23, 2], [25, 3], [27, 3], [29, 3]].map((cell, i) => ({ name: `Draghäst ${i + 1}`, cell })),
      },
    ],
  },
  {
    id: "old-bonegrinder",
    title: "Old Bonegrinder (O2–O3)",
    mapHint: "KVARN",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "O2 Benkvarnen",
        note: "Morgantha (night hag) sopar golvet i människoskepnad. Säljer drömbakelser (1 gp). Anfalls hon eller vägrar gruppen gå ropar hon på döttrarna. I O1 kan hon knacka tre gånger på tunnan och kalla fram en dretch (max 9) – använd Placera valfritt monster.",
        monster: "Night Hag",
        tokens: [{ name: "Morgantha (Night Hag)", cell: [7, 8] }],
      },
      {
        area: "O3 Sovrummet",
        note: "Bella Sunbane och Offalia Wormwiggle dansar runt kugghjulsaxeln. Två barn (Freek 7, Myrtle 5) i lådorna i garderoben. Försök att befria barnen väcker häxornas vrede. Skatt: 6 smycken à 25 gp i madrassen. Coven: delad trolldom så länge alla tre lever.",
        monster: "Night Hag",
        tokens: [
          { name: "Bella Sunbane (Night Hag)", cell: [17, 7] },
          { name: "Offalia Wormwiggle (Night Hag)", cell: [19, 9] },
        ],
      },
    ],
  },
  // ---------- Vallaki (kapitel 5) ----------
  {
    id: "vallaki-vistani-camp",
    title: "Vallaki – vistanilägret (N9)",
    mapHint: "VISTANILAGRET",
    map: { width: 3840, height: 2160, cell: 80 },
    groups: [
      {
        area: "N9c Tältet",
        note: "Luvash (Vistana Bandit Captain) piskar Alexei (Bandit, 3 HP kvar) vid tältstången för att Arabelle försvann. Arrigal (Vistana Assassin) står bredvid. Sex Vistani ligger däckade (vaknar av 5+ skada). Luvash säljer falska dimdrycker; hjälper gruppen om de hittar Arabelle (Lake Zarovich) eller skaffar sex fat vin.",
        monster: "Bandit Captain",
        tokens: [{ name: "Luvash (Bandit Captain)", cell: [23, 12] }],
      },
      {
        area: "N9c Arrigal",
        note: "Arrigal är farligast: stjäl föremål som är viktiga för Strahd, dödar om han tror sig komma undan, rider sedan till Ravenloft.",
        monster: "Assassin",
        tokens: [{ name: "Arrigal (Assassin)", cell: [25, 12] }],
      },
      {
        area: "N9c Alexei och de däckade",
        note: "Alexei har bara 3 HP kvar. De sex på marken är medvetslösa av vin.",
        monster: "Bandit",
        tokens: [[23, 14], [21, 12], [26, 15], [21, 15], [24, 16], [22, 16], [26, 11]].map((cell, i) => ({ name: i ? `Däckad Vistana ${i}` : "Alexei (3 HP)", cell })),
      },
      {
        area: "N9g Spelvagnarna",
        note: "Tre vagnar med tre spelande Vistani i varje. Kommer till tältet 2 rundor efter larm.",
        monster: "Bandit",
        tokens: [[16, 12], [16, 13], [16, 14], [30, 13], [30, 14], [30, 15], [23, 6], [24, 6], [25, 6]].map((cell, i) => ({ name: `Spelande Vistana ${i + 1}`, cell })),
      },
    ],
  },
  {
    id: "vallaki-church-feast",
    title: "Vallaki – S:t Andrals fest (N1, händelse)",
    mapHint: "ST ANDRAL - 1F",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "N1 Altaret",
        note: "Fader Lucian Petrovich (Priest). Händelsen inträffar om benen inte kommit tillbaka och vampyrerna i kistmakarens hus lever, efter 3 dygn i Vallaki. Dör Lucian och begravs reser han sig som vampire spawn nästa natt.",
        monster: "Priest",
        tokens: [{ name: "Fader Lucian (Priest)", cell: [7, 12] }],
      },
      {
        area: "N1 Strahd",
        note: "Kommer in som fladdermus och anfaller Lucian. Återvänder till Ravenloft när prästen är död.",
        monster: "Strahd von Zarovich",
        tokens: [{ name: "Strahd", cell: [8, 11] }],
      },
      {
        area: "N1 Vampyrerna på taket",
        note: "Sex vampire spawn klänger på väggar och tak och hoppar på församlingen när den flyr ut.",
        monster: "Vampire Spawn",
        tokens: [[6, 9], [11, 8], [21, 6], [6, 15], [11, 16], [22, 16]].map((cell, i) => ({ name: `Vampire Spawn ${i + 1}`, cell })),
      },
      {
        area: "N1 Klocktornet",
        note: "Fyra fladdermussvärmar kommer in genom klocktornet och skrämmer församlingen.",
        monster: "Swarm of Bats",
        tokens: [[15, 5], [17, 5], [15, 7], [17, 7]].map((cell, i) => ({ name: `Swarm of Bats ${i + 1}`, cell })),
      },
    ],
  },
  {
    id: "vallaki-blue-water-taproom",
    title: "Vallaki – Blue Water Inn, skänken (N2c)",
    mapHint: "BLUE WATER INN - 1F",
    map: { width: 3840, height: 2160, cell: 3840 / 36 },
    groups: [
      {
        area: "N2c Värdparet",
        note: "Urwin Martikov och Danika Dorakova – wereravens i Keepers of the Feather. Sönerna Brom och Bray är också wereravens. 1d4 fler wereravens finns i eller på värdshuset.",
        monster: "Wereraven",
        tokens: [{ name: "Urwin Martikov (Wereraven)", cell: [19, 9] }, { name: "Danika Dorakova (Wereraven)", cell: [22, 9] }],
      },
      {
        area: "N2c Jägarna",
        note: "Szoldar Szoldarovich och Yevgeni Krushkin (Scout) – vargjägare, dystra.",
        monster: "Scout",
        tokens: [{ name: "Szoldar (Scout)", cell: [19, 8] }, { name: "Yevgeni (Scout)", cell: [21, 8] }],
      },
      {
        area: "N2c Bröderna Wachter",
        note: "Nikolai och Karl Wachter (Noble) – berusade bråkstakar men inte dumma nog att ge sig på beväpnade främlingar.",
        monster: "Noble",
        tokens: [{ name: "Nikolai Wachter (Noble)", cell: [19, 12] }, { name: "Karl Wachter (Noble)", cell: [21, 12] }],
      },
      {
        area: "N2c Rictavio",
        note: "Färggrann halvalvisk bard – egentligen Rudolph van Richten (hat of disguise, ring of mind shielding). Går ut i gryning och skymning med mat till 'en fattig vän' (tigern i Arasek, N5).",
        monster: "Rictavio",
        tokens: [{ name: "Rictavio", cell: [22, 12] }],
      },
    ],
  },
  {
    id: "vallaki-blue-water-loft",
    title: "Vallaki – Blue Water Inn, korpskullen (N2h)",
    mapHint: "BLUE WATER INN - 2F",
    map: { width: 3840, height: 2160, cell: 3840 / 36 },
    groups: [
      {
        area: "N2h Korpskullen",
        note: "Rör någon den låsta kistan under höet blir korparna fyra korpsvärmar och anfaller. Två döda → resten flyr. Kistan: 140 ep, 70 pp, 2 Elixir of Health, 3 Potion of Healing, Bag of Tricks (grå).",
        monster: "Swarm of Ravens",
        tokens: [[10, 7], [12, 7], [10, 8], [12, 8]].map((cell, i) => ({ name: `Swarm of Ravens ${i + 1}`, cell })),
      },
    ],
  },
  {
    id: "vallaki-burgomaster-1f",
    title: "Vallaki – borgmästarens hus 1F (N3)",
    mapHint: "BORGMASTARENS HUS - 1F",
    map: { width: 3840, height: 2160, cell: 3840 / 36 },
    groups: [
      {
        area: "N3c Matsalen",
        note: "Baronessan Lydia Petrovna (Commoner) bjuder åtta fattiga kvinnor på te och tårta; de syr barndräkter och flätar vide-solen till festivalen. Lydia skrattar nervöst åt allt.",
        monster: "Commoner",
        tokens: [{ name: "Lydia Petrovna (Commoner)", cell: [17, 13] }, ...[[18, 12], [19, 12], [20, 12], [21, 12], [18, 14], [19, 14], [20, 14], [21, 14]].map((cell, i) => ({ name: `Bykvinna ${i + 1}`, cell }))],
      },
    ],
  },
  {
    id: "vallaki-burgomaster-2f",
    title: "Vallaki – borgmästarens hus 2F (N3)",
    mapHint: "BORGMASTARENS HUS - 2F",
    map: { width: 3840, height: 2160, cell: 3840 / 36 },
    groups: [
      {
        area: "N3l Biblioteket",
        note: "Baron Vargas Vallakovich (Noble) i bröstharnesk och rapir. 'All will be well!' Bär nycklar till N3g och till Udos cell (N3m). Blir han ovän med gruppen skickar han 12 vakter, sedan Izek med en mobb på 30.",
        monster: "Noble",
        tokens: [{ name: "Baron Vargas Vallakovich (Noble)", cell: [16, 8] }],
      },
      {
        area: "N3l Mastiffarna",
        note: "Baronens två svarta mastiffer följer honom överallt.",
        monster: "Mastiff",
        tokens: [{ name: "Mastiff 1", cell: [15, 8] }, { name: "Mastiff 2", cell: [17, 8] }],
      },
      {
        area: "N3j Izeks sovrum (natt)",
        note: "Izek Strazni sover här på natten (dörren låst, han har nyckeln); på dagen är han ute i stan. Dockor i Ireenas likhet från Blinsky.",
        monster: "Izek Strazni",
        tokens: [{ name: "Izek Strazni", cell: [21, 11] }],
      },
    ],
  },
  {
    id: "vallaki-burgomaster-3f",
    title: "Vallaki – borgmästarens vind, Victors arbetsrum (N3t)",
    mapHint: "BORGMASTARENS HUS - 3F",
    map: { width: 3840, height: 2160, cell: 3840 / 36 },
    groups: [
      {
        area: "N3t Victor",
        note: "Victor Vallakovich (Mage) läser högt ur sin besvärjelsebok. Glyph of warding på dörren (5d8 blixt) om någon annan öppnar. Kastar greater invisibility om han störs. Den trasiga teleportationscirkeln under mattan sliter isär den som använder den.",
        monster: "Mage",
        tokens: [{ name: "Victor Vallakovich (Mage)", cell: [29, 9] }],
      },
      {
        area: "N3t Kattskeletten",
        note: "Sex kattskelett (Cat, men darkvision 60 ft och immuna mot gift, utmattning och förgiftning). Anfaller bara på Victors order.",
        monster: "Cat",
        tokens: [[27, 5], [29, 6], [30, 8], [27, 10], [30, 11], [30, 13]].map((cell, i) => ({ name: `Kattskelett ${i + 1}`, cell })),
      },
    ],
  },
  {
    id: "vallaki-wachterhaus-2f",
    title: "Vallaki – Wachterhaus 2F (N4)",
    mapHint: "WACHTERHAUS - 2F",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "N4p Biblioteket",
        note: "Lady Fiona Wachter (Priest, AC 10, ingen rustning) – Strahds lojala tjänare och djävulsdyrkande kultledare. Vill bli borgmästare; föreslår att gruppen dödar Izek. Sover med sin döde makes lik i sovrummet (N4o).",
        monster: "Priest",
        tokens: [{ name: "Lady Fiona Wachter (Priest)", cell: [9, 7] }],
      },
      {
        area: "N4n Stellas rum",
        note: "Stella Wachter (Commoner) – inlåst, tror att hon är en katt (efter Strahds charm).",
        monster: "Commoner",
        tokens: [{ name: "Stella Wachter (Commoner)", cell: [12, 8] }],
      },
    ],
  },
  {
    id: "vallaki-wachterhaus-cellar",
    title: "Vallaki – Wachterhaus källare, kulten (N4t)",
    mapHint: "WACHTERHAUS - KALLARE",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "N4t Kultens högkvarter",
        note: "Fyra stadsbor (Cult Fanatic) i Fionas 'bokcirkel' väntar på att hon ska komma och läsa ur sitt manifest. Anfaller inkräktare.",
        monster: "Cult Fanatic",
        tokens: [[11, 9], [13, 9], [10, 11], [14, 11]].map((cell, i) => ({ name: `Cult Fanatic ${i + 1}`, cell })),
      },
    ],
  },
  {
    id: "vallaki-arasek",
    title: "Vallaki – Arasek Stockyard, Rictavios vagn (N5)",
    mapHint: "ARASEK - GARDEN",
    map: { width: 3500, height: 2500, cell: 100 },
    groups: [
      {
        area: "N5 Karnevalsvagnen",
        note: "'Rictavio's Carnival of Wonders' – hänglås med giftnål. Inne: sabeltandad tiger (84 HP, halvplåt AC 17) tränad att jaga Vistani; anfaller bara Vistani eller i självförsvar. Tokenen står på vagnens rutor – tigern är inne i vagnen; visa den först när vagnen öppnas.",
        monster: "Armored Saber-Toothed Tiger",
        tokens: [{ name: "Rictavios tiger", cell: [15.5, 9.5] }],
      },
    ],
  },
  {
    id: "vallaki-coffin-maker",
    title: "Vallaki – kistmakarens hus (N6)",
    mapHint: "KISTMAKAREN",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "N6f Vampyrnästet (övervåningen)",
        note: "Sex lådor med jord i norra delen – sex vampire spawn (före detta äventyrare). Öppnas en låda brister alla ut och anfaller. Teleport från K78 landar här.",
        monster: "Vampire Spawn",
        tokens: [[20, 3], [22, 3], [24, 3], [22, 5], [23, 5], [24, 8]].map((cell, i) => ({ name: `Vampire Spawn ${i + 1}`, cell })),
      },
      {
        area: "N6e Henriks sovrum",
        note: "Henrik van der Voort (Commoner) gör inget motstånd och berättar var benen (garderoben, hemligt fack DC 15) och vampyrerna finns.",
        monster: "Commoner",
        tokens: [{ name: "Henrik van der Voort", cell: [19, 8] }],
      },
    ],
  },
];
