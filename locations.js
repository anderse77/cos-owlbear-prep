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
  "Vine Blight": { slug: "vineblight-anderse77", size: 1, custom: true, stats: {"hp": 26, "ac": 12, "init": -1, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Entangling Plants", "max": 1, "used": 0, "resets": ["Round"], "formula": "1d6>4"}]} },
  "Deva": { slug: "deva-wotcsrd", size: 1, stats: {"hp": 229, "ac": 17, "init": 4, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Bonus", "max": 2, "used": 0, "resets": ["Day"], "formula": null}]} },
  "Flesh Golem": { slug: "fleshgolem-wotcsrd", size: 1, stats: {"hp": 127, "ac": 9, "init": -1, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Goat": { slug: "goat-wotcsrd", size: 1, stats: {"hp": 4, "ac": 10, "init": 0, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Giant Venomous Snake": { slug: "giantvenomoussnake-wotcsrd", size: 1, stats: {"hp": 11, "ac": 14, "init": 4, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Swarm of Venomous Snakes": { slug: "swarmofvenomoussnakes-wotcsrd", size: 1, stats: {"hp": 36, "ac": 14, "init": 4, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Vrock": { slug: "vrock-wotcsrd", size: 2, stats: {"hp": 152, "ac": 15, "init": 2, "limits": [{"id": "Stunning Screech", "max": 1, "used": 0, "resets": ["Day"], "formula": "1d6>5"}, {"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": "1d6>5"}, {"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Specter": { slug: "specter-wotcsrd", size: 1, stats: {"hp": 22, "ac": 12, "init": 2, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Roc": { slug: "roc-wotcsrd", size: 4, stats: {"hp": 248, "ac": 15, "init": 8, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Bonus", "max": 1, "used": 0, "resets": ["Round"], "formula": "1d6>4"}]} },
  "Giant Goat": { slug: "giantgoat-wotcsrd", size: 2, stats: {"hp": 19, "ac": 11, "init": 1, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Arcanaloth": { slug: "arcanaloth-anderse77", size: 1, custom: true, stats: {"hp": 104, "ac": 17, "init": 1, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Spell slot 1", "max": 4, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 2", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 3", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 4", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 5", "max": 2, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 6", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 7", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 8", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}]} },
  "Flameskull": { slug: "flameskull-anderse77", size: 1, custom: true, stats: {"hp": 40, "ac": 13, "init": 3, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Spell slot 1", "max": 3, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 2", "max": 2, "used": 0, "resets": ["Long Rest"], "formula": null}, {"id": "Spell slot 3", "max": 1, "used": 0, "resets": ["Long Rest"], "formula": null}]} },
  "Quasit": { slug: "quasit-wotcsrd", size: 1, stats: {"hp": 25, "ac": 13, "init": 3, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Scare", "max": 1, "used": 0, "resets": ["Day"], "formula": null}]} },
  "Hell Hound": { slug: "hellhound-wotcsrd", size: 1, stats: {"hp": 58, "ac": 15, "init": 1, "limits": [{"id": "Action", "max": 1, "used": 0, "resets": ["Round"], "formula": "1d6>4"}, {"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}]} },
  "Stone Golem": { slug: "stonegolem-wotcsrd", size: 2, stats: {"hp": 220, "ac": 18, "init": 3, "limits": [{"id": "Multiattack", "max": 2, "used": 0, "resets": ["Round"], "formula": null}, {"id": "Bonus", "max": 1, "used": 0, "resets": ["Round"], "formula": "1d6>4"}]} },
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
  // ---------- Kapitel 2: L. Lake Zarovich ----------
  {
    id: "lake-zarovich-bluto",
    title: "Lake Zarovich – Bluto och Arabelle (L)",
    mapHint: "SJON (BLUTO)",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "L Båten mitt på sjön (400 fot från stranden)",
        note: "Bluto Krogarov (Commoner) fiskar i trans och svarar inte om han inte anfalls. Ser gruppen på honom några minuter från stranden, eller ror ut, kastar han säcken i vattnet. Simma dit från stranden: DC 15 Athletics; med roddbåt DC 10. Tre roddbåtar ligger på södra stranden (5 personer var). Ingen båttoken – lägg gärna en båt under dem.",
        monster: "Commoner",
        tokens: [{ name: "Bluto Krogarov", cell: [15, 8] }],
      },
      {
        area: "L Arabelle i säcken",
        note: "Arabelle (7 år, Vistana, Commoner med 2 HP, inga attacker) ligger bunden i en jutesäck i båten. Räddad vill hon tillbaka till lägret utanför Vallaki (N9) – Luvash belönar gruppen. Hon är Madam Evas ättling och har kunglig barovisk släkt.",
        monster: "Commoner",
        tokens: [{ name: "Arabelle (2 HP)", cell: [16, 8] }],
      },
    ],
  },
  // ---------- Kapitel 12: The Wizard of Wines (M) ----------
  {
    id: "wizard-of-wines-grove",
    title: "Wizard of Wines – lunden vid vägen (familjen Martikov)",
    mapHint: "VINGARDEN - VAGEN",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "M Lunden norr om stigen",
        note: "En kappklädd man (Davian Martikov) vinkar från trädkanten. Familjen är wereravens i Keepers of the Feather, utdrivna av druider och blights. Davian är misstänksam och säger inget om de stulna magiska ädelstenarna förrän vinkällaren är befriad – då ber han gruppen åka till Berez (U) och Yester Hill (Y). Martin och Viggo har bara 7 HP; Yolanda är en baby (1 HP).",
        monster: "Wereraven",
        tokens: [
          { name: "Davian Martikov (Wereraven)", cell: [6, 5] },
          { name: "Adrian Martikov (Wereraven)", cell: [4, 4] },
          { name: "Elvir Martikov (Wereraven)", cell: [3, 4] },
          { name: "Stefania Martikov (Wereraven)", cell: [2, 4] },
          { name: "Dag Tomescu (Wereraven)", cell: [1, 4] },
          { name: "Claudiu (Wereraven)", cell: [5, 4] },
          { name: "Martin (Wereraven, 7 HP)", cell: [2, 5] },
          { name: "Viggo (Wereraven, 7 HP)", cell: [3, 5] },
        ],
      },
      {
        area: "M Babyn Yolanda",
        note: "Yolanda (1 HP) kan ännu inte byta skepnad.",
        monster: "Commoner",
        tokens: [{ name: "Yolanda (1 HP)", cell: [4, 5] }],
      },
    ],
  },
  {
    id: "wizard-of-wines-1f",
    title: "Wizard of Wines – vinkällaren 1F (W1–W12)",
    mapHint: "VINGARDEN - 1F",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "W9 Jäskaren (druiden på balkongen)",
        note: "Vild druid i djurhudar och gethornshuvudbonad häller gift i den västligaste tunnan. Anfalls hon kallar hon fram de 24 twig blights; då dyker 4 swarms of ravens från takbjälkarna och sliter sönder en blight var per tur. Går gruppen ut och slåss: druiden + twig blights ansluter runda 3.",
        monster: "Druid",
        tokens: [{ name: "Druid (W9, giftblanderskan)", cell: [8, 8] }],
      },
      {
        area: "W9 Twig blights i östra tunnan",
        note: "24 twig blights gömda i den spräckta östligaste tunnan (täckning). Små tokens, fyra per ruta.",
        monster: "Twig Blight",
        size: 0.5,
        tokens: Array.from({ length: 24 }, (_, i) => ({ name: `Twig Blight ${i + 1}`, cell: [15 + (Math.floor(i / 4) % 3) + (i % 2) * 0.5, 9 + Math.floor(i / 12) + (Math.floor(i / 2) % 2) * 0.5] })),
      },
      {
        area: "W1 Stallet",
        note: "Familjens två draghästar som drar vinvagnen.",
        monster: "Draft Horse",
        tokens: [{ name: "Draghäst 1", cell: [22.5, 3.5] }, { name: "Draghäst 2", cell: [24.5, 3.5] }],
      },
      {
        area: "Vingården – 30 needle blights",
        note: "När gruppen når vinkällaren kliver 30 needle blights (sex grupper om fem) fram ur vinraderna 120 fot bort, fart 30 fot. Gruppen kan barrikadera sig. Stannar de ute: runda 3 druid + 24 twig blights (W9), runda 4 druid + 5 needle blights (W14), runda 5 druid + 2 vine blights (W20). Druiden i W16 har Gulthias-staven – förstörs den vissnar alla blights inom 300 fot.",
        monster: "Needle Blight",
        tokens: [
          ...[5, 6, 7, 8, 9].map((r) => [0, r]), ...[5, 6, 7, 8, 9].map((r) => [31, r]),
          ...[10, 11, 12, 13, 14].map((c) => [c, 0]), ...[5, 6, 7, 8, 9].map((c) => [c, 17]),
          ...[12, 13, 14, 15, 16].map((c) => [c, 17]), ...[18, 19, 20, 21, 22].map((c) => [c, 17]),
        ].map((cell, i) => ({ name: `Needle Blight ${i + 1} (grupp ${Math.floor(i / 5) + 1})`, cell })),
      },
    ],
  },
  {
    id: "wizard-of-wines-2f",
    title: "Wizard of Wines – vinkällaren 2F (W16–W20)",
    mapHint: "VINGARDEN - 2F",
    map: { width: 3840, height: 2160, cell: 120 },
    groups: [
      {
        area: "W16 Lastvinschen",
        note: "Blodmålad druid uppe på vinschen viftar med en svart gren: Gulthias-staven ('Nature bows to my every whim, for I have the vampire's staff!' på druidiska). Slåss bara om han är trängd – annars hoppar han ned på vagnen i W2 och gömmer sig. Hemlig dörr i västra väggen till sovrummet W17.",
        monster: "Druid",
        tokens: [{ name: "Druid (W16, Gulthias-staven)", cell: [20, 5] }],
      },
      {
        area: "W20 Tryckpressen",
        note: "Lerig druid med mossa för ansiktet river i skåpet; två vine blights bakom henne. Slåss till döden. I skåpet: nyckeln till hänglåset mellan W5 och W9.",
        monster: "Druid",
        tokens: [{ name: "Druid (W20, mossan)", cell: [6, 5] }],
      },
      {
        area: "W20 Vine blights",
        note: "Två vine blights vaktar druiden.",
        monster: "Vine Blight",
        tokens: [{ name: "Vine Blight 1", cell: [6, 6] }, { name: "Vine Blight 2", cell: [6, 7] }],
      },
      {
        area: "W9 Korparna i takbjälkarna",
        note: "Fyra swarms of ravens anfaller aldrig gruppen – de anfaller twig blights (en blight per svärm och tur) när druiden kallar fram dem.",
        monster: "Swarm of Ravens",
        tokens: [[8, 8], [11, 8], [14, 8], [16, 8]].map((cell, i) => ({ name: `Swarm of Ravens ${i + 1} (vänlig)`, cell })),
      },
    ],
  },
  {
    id: "wizard-of-wines-cellar",
    title: "Wizard of Wines – vinkällaren (W14)",
    mapHint: "VINGARDEN - VINKALLARE",
    map: { width: 3840, height: 2160, cell: 240 },
    groups: [
      {
        area: "W14 Bakom östra vinstället",
        note: "Druid med hjorthorn + 5 needle blights. Första turen: thunderwave bakom stället (1d20+10 flaskor krossas). Mot norra väggen: 3 frostiga tunnor Purple Grapemash No. 3; stället har 40 flaskor Red Dragon Crush. Hemlig dörr mellan halvorna → W15 (10 fläckar brown mold).",
        monster: "Druid",
        tokens: [{ name: "Druid (W14, hjorthornen)", cell: [13, 3] }],
      },
      {
        area: "W14 Needle blights",
        note: "Gömda bakom stället tillsammans med druiden.",
        monster: "Needle Blight",
        tokens: [[11, 3], [12, 3], [14, 3], [12, 2], [13, 2]].map((cell, i) => ({ name: `Needle Blight W14-${i + 1}`, cell })),
      },
    ],
  },
  // ---------- Kapitel 8: Krezk (S) ----------
  {
    "id": "krezk-gatehouse",
    "title": "Krezk – porten (S2)",
    "mapHint": "PORTEN (GATEHOUSE)",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "S2 Bågskyttar i tornen",
        "note": "Två bågskyttar (Scout), en i varje torn, bakom 6 tum breda skottgluggar. Larmet går om någon flyger eller klättrar över muren – fem rundor senare kommer 4 vakter till och 40 bybor (Commoner med handyxor).",
        "monster": "Scout",
        "tokens": [
          {
            "name": "Bågskytt (västra tornet)",
            "cell": [
              20,
              4
            ]
          },
          {
            "name": "Bågskytt (östra tornet)",
            "cell": [
              29,
              4
            ]
          }
        ]
      },
      {
        "area": "S2 Vakter på muren",
        "note": "Fyra nervösa vakter i pälsmössor med spjut. Porten är bommad (DC 15 Strength) – kräver belägringsvapen för att brytas.",
        "monster": "Guard",
        "tokens": [
          {
            "name": "Vakt 1",
            "cell": [
              8,
              4
            ]
          },
          {
            "name": "Vakt 2",
            "cell": [
              15,
              4
            ]
          },
          {
            "name": "Vakt 3",
            "cell": [
              34,
              4
            ]
          },
          {
            "name": "Vakt 4",
            "cell": [
              42,
              4
            ]
          }
        ]
      },
      {
        "area": "S2 Borgmästare Dmitri Krezkov",
        "note": "Hämtas av en vakt. Släpper bara in gruppen om de hjälper byn – helst med en vagnslast vin från Wizard of Wines. Sörjer i hemlighet sonen Ilya (DC 12 Insight). Står innanför porten.",
        "monster": "Noble",
        "tokens": [
          {
            "name": "Dmitri Krezkov (Noble)",
            "cell": [
              24,
              1
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "krezk-abbey-north-1f",
    "title": "Krezk – klostret, norra flygeln och gården (S6–S13)",
    "mapHint": "NORRA FLYGELN 1F",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "S6 Norra porten",
        "note": "Otto och Zygfrek Belview sover under pälsar vid grindarna (DC 12 Stealth för att klättra förbi). Vänliga gäster eskorteras till gården; de hämtar Abboten.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "Otto Belview (Mongrelfolk)",
            "cell": [
              43,
              17
            ]
          },
          {
            "name": "Zygfrek Belview (Mongrelfolk)",
            "cell": [
              43,
              20
            ]
          }
        ]
      },
      {
        "area": "S12a Brunnen – Mishka",
        "note": "Mishka Belview hänger 20 fot ner i brunnen (Spider Climb) och kilar upp och anfaller den som lyser ner. Gillar att döda.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "Mishka Belview (i brunnen)",
            "cell": [
              14,
              18
            ]
          }
        ]
      },
      {
        "area": "S12d Tjuderstolpen – Marzena",
        "note": "Marzena Belview (fladdermusvingar, spindelkäkar) kedjad vid en stolpe; fladdrar och skriker. Rädd för alla utom Clovin. Befrias hon flyger hon iväg för gott.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "Marzena Belview (kedjad)",
            "cell": [
              18,
              14
            ]
          }
        ]
      },
      {
        "area": "S12c Hönshusen (9 låsta)",
        "note": "Nio låsta skjul (Clovin har nycklarna), en ylande mongrelfolk fastkedjad i varje. Placeras inte – lägg ut vid behov.",
        "monster": "Mongrelfolk",
        "tokens": []
      },
      {
        "area": "S13 Stora salen – Abboten",
        "note": "Abboten (en deva i förklädnad, munkkåpa, Morninglords symbol) lär Vasilka etikett. Vänlig om gruppen är vänlig: vill ha en brudklänning åt henne och erbjuder raise dead ×3 eller healing touch. Hotas Vasilka visar han sin änglaform. Solskivan över spisen 750 gp, bakom den Potion of Superior Healing; 4 kandelabrar à 250 gp.",
        "monster": "Deva",
        "tokens": [
          {
            "name": "Abboten (Deva)",
            "cell": [
              33,
              13
            ]
          }
        ]
      },
      {
        "area": "S13 Vasilka",
        "note": "Vasilka – flesh golem sydd av kroppsdelar från Krezks gravar, tänkt som Strahds brud. Kan inte tala; skriker om hon skadas. Blir hon bärsärk slåss hon tills Abboten tar kontroll.",
        "monster": "Flesh Golem",
        "tokens": [
          {
            "name": "Vasilka (Flesh Golem)",
            "cell": [
              33,
              12
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "krezk-abbey-madhouse",
    "title": "Krezk – klostret, dårhuset (S14–S15)",
    "mapHint": "DARHUSET",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "S15 Golemen i korridoren",
        "note": "Den första, grövre flesh golemen (7 fot) patrullerar den mörka korridoren och anfaller alla som inte är med Abboten eller Clovin. Ljud/ljus i S14 lockar dit den.",
        "monster": "Flesh Golem",
        "tokens": [
          {
            "name": "Flesh Golem (dårhuset)",
            "cell": [
              32,
              8
            ]
          }
        ]
      },
      {
        "area": "S15a Rädda mongrelfolk (3)",
        "note": "Tre skrikande mongrelfolk i nordvästra hörnet; en vaggar en mässingsljusstake som en docka – försöker man ta den anfaller den. Rummen är tilldelade väst→öst, norra raden a–d, södra e–h – stäm av mot bokens karta.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "S15a Mongrelfolk 1",
            "cell": [
              23,
              4
            ]
          },
          {
            "name": "S15a Mongrelfolk 2",
            "cell": [
              24,
              4
            ]
          },
          {
            "name": "S15a Mongrelfolk 3",
            "cell": [
              25,
              4
            ]
          }
        ]
      },
      {
        "area": "S15b Grälande mongrelfolk (5)",
        "note": "Fyra slåss om rangordning (inte till döden), en femte skrattar bakom en bitmärkt trästaty av Saint Markovia. Rummen är tilldelade väst→öst, norra raden a–d, södra e–h – stäm av mot bokens karta.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "S15b Mongrelfolk 1",
            "cell": [
              28,
              4
            ]
          },
          {
            "name": "S15b Mongrelfolk 2",
            "cell": [
              29,
              4
            ]
          },
          {
            "name": "S15b Mongrelfolk 3",
            "cell": [
              30,
              4
            ]
          },
          {
            "name": "S15b Mongrelfolk 4",
            "cell": [
              28,
              5
            ]
          },
          {
            "name": "S15b Mongrelfolk 5",
            "cell": [
              29,
              5
            ]
          }
        ]
      },
      {
        "area": "S15c Besvärjande mongrelfolk (7)",
        "note": "Sju sitter i ring och 'besvärjer' klockan så att det blir mat – nonsens, ingen magi. Rummen är tilldelade väst→öst, norra raden a–d, södra e–h – stäm av mot bokens karta.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "S15c Mongrelfolk 1",
            "cell": [
              32,
              4
            ]
          },
          {
            "name": "S15c Mongrelfolk 2",
            "cell": [
              33,
              4
            ]
          },
          {
            "name": "S15c Mongrelfolk 3",
            "cell": [
              34,
              4
            ]
          },
          {
            "name": "S15c Mongrelfolk 4",
            "cell": [
              32,
              5
            ]
          },
          {
            "name": "S15c Mongrelfolk 5",
            "cell": [
              33,
              5
            ]
          },
          {
            "name": "S15c Mongrelfolk 6",
            "cell": [
              34,
              5
            ]
          },
          {
            "name": "S15c Mongrelfolk 7",
            "cell": [
              32,
              6
            ]
          }
        ]
      },
      {
        "area": "S15d Hungriga mongrelfolk (9)",
        "note": "Nio som inte fått mat på dagar (Clovin ogillar dem) – försöker döda och äta den som kliver in. Rummen är tilldelade väst→öst, norra raden a–d, södra e–h – stäm av mot bokens karta.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "S15d Mongrelfolk 1",
            "cell": [
              36,
              4
            ]
          },
          {
            "name": "S15d Mongrelfolk 2",
            "cell": [
              37,
              4
            ]
          },
          {
            "name": "S15d Mongrelfolk 3",
            "cell": [
              38,
              4
            ]
          },
          {
            "name": "S15d Mongrelfolk 4",
            "cell": [
              39,
              4
            ]
          },
          {
            "name": "S15d Mongrelfolk 5",
            "cell": [
              36,
              5
            ]
          },
          {
            "name": "S15d Mongrelfolk 6",
            "cell": [
              37,
              5
            ]
          },
          {
            "name": "S15d Mongrelfolk 7",
            "cell": [
              38,
              5
            ]
          },
          {
            "name": "S15d Mongrelfolk 8",
            "cell": [
              39,
              5
            ]
          },
          {
            "name": "S15d Mongrelfolk 9",
            "cell": [
              36,
              6
            ]
          }
        ]
      },
      {
        "area": "S15e Mongrelfolk-horden (16)",
        "note": "Sexton skrikande i sin egen smuts bland gnagda ben; tigger om mat. Rummen är tilldelade väst→öst, norra raden a–d, södra e–h – stäm av mot bokens karta.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "S15e Mongrelfolk 1",
            "cell": [
              23,
              10
            ]
          },
          {
            "name": "S15e Mongrelfolk 2",
            "cell": [
              24,
              10
            ]
          },
          {
            "name": "S15e Mongrelfolk 3",
            "cell": [
              25,
              10
            ]
          },
          {
            "name": "S15e Mongrelfolk 4",
            "cell": [
              26,
              10
            ]
          },
          {
            "name": "S15e Mongrelfolk 5",
            "cell": [
              23,
              11
            ]
          },
          {
            "name": "S15e Mongrelfolk 6",
            "cell": [
              24,
              11
            ]
          },
          {
            "name": "S15e Mongrelfolk 7",
            "cell": [
              25,
              11
            ]
          },
          {
            "name": "S15e Mongrelfolk 8",
            "cell": [
              26,
              11
            ]
          },
          {
            "name": "S15e Mongrelfolk 9",
            "cell": [
              23,
              12
            ]
          },
          {
            "name": "S15e Mongrelfolk 10",
            "cell": [
              24,
              12
            ]
          },
          {
            "name": "S15e Mongrelfolk 11",
            "cell": [
              25,
              12
            ]
          },
          {
            "name": "S15e Mongrelfolk 12",
            "cell": [
              26,
              12
            ]
          },
          {
            "name": "S15e Mongrelfolk 13",
            "cell": [
              23,
              13
            ]
          },
          {
            "name": "S15e Mongrelfolk 14",
            "cell": [
              24,
              13
            ]
          },
          {
            "name": "S15e Mongrelfolk 15",
            "cell": [
              25,
              13
            ]
          },
          {
            "name": "S15e Mongrelfolk 16",
            "cell": [
              26,
              13
            ]
          }
        ]
      },
      {
        "area": "S15f Sjungande mongrelfolk (8)",
        "note": "Åtta dansar och sjunger 'The devil dwells in his dark house…'. Ledaren håller en gyllene statyett av Saint Markovia (250 gp, +1 på räddningsslag för goda). Rummen är tilldelade väst→öst, norra raden a–d, södra e–h – stäm av mot bokens karta.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "S15f Mongrelfolk 1",
            "cell": [
              28,
              10
            ]
          },
          {
            "name": "S15f Mongrelfolk 2",
            "cell": [
              29,
              10
            ]
          },
          {
            "name": "S15f Mongrelfolk 3",
            "cell": [
              30,
              10
            ]
          },
          {
            "name": "S15f Mongrelfolk 4",
            "cell": [
              28,
              11
            ]
          },
          {
            "name": "S15f Mongrelfolk 5",
            "cell": [
              29,
              11
            ]
          },
          {
            "name": "S15f Mongrelfolk 6",
            "cell": [
              30,
              11
            ]
          },
          {
            "name": "S15f Mongrelfolk 7",
            "cell": [
              28,
              12
            ]
          },
          {
            "name": "S15f Mongrelfolk 8",
            "cell": [
              29,
              12
            ]
          }
        ]
      },
      {
        "area": "S15g Mongrelfolk-ungar (10)",
        "note": "Tio, varav tre vårdar ungar (icke-stridande). Rummen är tilldelade väst→öst, norra raden a–d, södra e–h – stäm av mot bokens karta.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "S15g Mongrelfolk 1",
            "cell": [
              32,
              10
            ]
          },
          {
            "name": "S15g Mongrelfolk 2",
            "cell": [
              33,
              10
            ]
          },
          {
            "name": "S15g Mongrelfolk 3",
            "cell": [
              34,
              10
            ]
          },
          {
            "name": "S15g Mongrelfolk 4",
            "cell": [
              32,
              11
            ]
          },
          {
            "name": "S15g Mongrelfolk 5",
            "cell": [
              33,
              11
            ]
          },
          {
            "name": "S15g Mongrelfolk 6",
            "cell": [
              34,
              11
            ]
          },
          {
            "name": "S15g Mongrelfolk 7",
            "cell": [
              32,
              12
            ]
          },
          {
            "name": "S15g Mongrelfolk 8",
            "cell": [
              33,
              12
            ]
          },
          {
            "name": "S15g Mongrelfolk 9",
            "cell": [
              34,
              12
            ]
          },
          {
            "name": "S15g Mongrelfolk 10",
            "cell": [
              32,
              13
            ]
          }
        ]
      },
      {
        "area": "S15h Mongrelfolk-fortet (2)",
        "note": "Två i ett fort av möbelrester – kommer bara ut för mat; har täckning. Rummen är tilldelade väst→öst, norra raden a–d, södra e–h – stäm av mot bokens karta.",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "S15h Mongrelfolk 1",
            "cell": [
              36,
              10
            ]
          },
          {
            "name": "S15h Mongrelfolk 2",
            "cell": [
              37,
              10
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "krezk-abbey-loft",
    "title": "Krezk – klostret, loftet (S17)",
    "mapHint": "NORRA FLYGELN 2F",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "S17 Clovin Belview",
        "note": "Tvåhövdad mongrelfolk, Abbotens hovmästare, spelar viol vackert när han är full. Under pälsarna: 3 flaskor Purple Grapemash. Bordet med svart svepning: kroppsdelar (illusion: gruppens egna). Teleport från K78 landar här (T).",
        "monster": "Mongrelfolk",
        "tokens": [
          {
            "name": "Clovin Belview (Mongrelfolk)",
            "cell": [
              32,
              4
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "krezk-abbey-hospital",
    "title": "Krezk – klostret, sjukhuset (S19–S24)",
    "mapHint": "SJUKHUSET",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "S21 Det hemsökta sjukhuset",
        "note": "Sex skuggor väntar tills någon är 10 fot in i rummet och anfaller sedan. De kan inte lämna rummet.",
        "monster": "Shadow",
        "tokens": [
          {
            "name": "Shadow 1",
            "cell": [
              25,
              9
            ]
          },
          {
            "name": "Shadow 2",
            "cell": [
              28,
              9
            ]
          },
          {
            "name": "Shadow 3",
            "cell": [
              31,
              9
            ]
          },
          {
            "name": "Shadow 4",
            "cell": [
              25,
              12
            ]
          },
          {
            "name": "Shadow 5",
            "cell": [
              28,
              12
            ]
          },
          {
            "name": "Shadow 6",
            "cell": [
              31,
              12
            ]
          }
        ]
      },
      {
        "area": "S19 Ezmerelda d'Avenir (om inte mött)",
        "note": "Vampyrjägaren väntar på att Strahd ska besöka sin brud och planerar en magisk cirkel. Är gruppen fast besluten att besegra Strahd erbjuder hon sig att slå följe. Rummet är ungefärligt.",
        "monster": "Ezmerelda d'Avenir",
        "tokens": [
          {
            "name": "Ezmerelda d'Avenir",
            "cell": [
              38,
              10
            ]
          }
        ]
      }
    ]
  },
  // ---------- Kapitel 10: Berez (U) ----------
  {
    "id": "berez-hut",
    "title": "Berez – Baba Lysagas hydda (U3)",
    "mapHint": "BABA LYSAGAS HYDDA",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "U3 Baba Lysaga i hyddan",
        "note": "Baba Lysaga är inne om hon inte lockats ut; fåglarnas skrän gör att hon inte hör någon närma sig. Inne: illusion av ett spädbarn ('Strahd'), blodbadkar, kista med glyph of warding (DC 17, 5d8 thunder) och 4 swarms of insects. Under golvplankorna (3 fot ner) ligger den gröna ädelstenen från Wizard of Wines – den animerar hyddan.",
        "monster": "Baba Lysaga",
        "tokens": [
          {
            "name": "Baba Lysaga",
            "cell": [
              24,
              13
            ]
          }
        ]
      },
      {
        "area": "U3 Korparna i burarna",
        "note": "En swarm of ravens i var och en av de två järnburarna vid dörren (arcane lock; knock eller DC 20 Strength). Släpps de anfaller de Baba Lysaga och fågelskrämmorna.",
        "monster": "Swarm of Ravens",
        "tokens": [
          {
            "name": "Swarm of Ravens (bur 1)",
            "cell": [
              22,
              13
            ]
          },
          {
            "name": "Swarm of Ravens (bur 2)",
            "cell": [
              26,
              11
            ]
          }
        ]
      },
      {
        "area": "U Fågelskrämmorna i träsket",
        "note": "Sju scarecrows ser ut som vanliga fågelskrämmor fyllda med korpfjädrar tills någon anfaller dem, Baba Lysaga befaller dem eller någon går närmare än 10 fot. Placerade ungefärligt runt hyddan.",
        "monster": "Scarecrow",
        "tokens": [
          {
            "name": "Scarecrow 1",
            "cell": [
              14,
              6
            ]
          },
          {
            "name": "Scarecrow 2",
            "cell": [
              30,
              5
            ]
          },
          {
            "name": "Scarecrow 3",
            "cell": [
              34,
              13
            ]
          },
          {
            "name": "Scarecrow 4",
            "cell": [
              30,
              21
            ]
          },
          {
            "name": "Scarecrow 5",
            "cell": [
              15,
              20
            ]
          },
          {
            "name": "Scarecrow 6",
            "cell": [
              10,
              13
            ]
          },
          {
            "name": "Scarecrow 7",
            "cell": [
              22,
              22
            ]
          }
        ]
      },
      {
        "area": "Den krypande hyddan (specialhändelse)",
        "note": "Stannar gruppen för länge befaller Baba Lysaga hyddan att vakna: rötterna lyfter den ur myren. Slåss tills den förstörs eller ädelstenen tas bort. Token ligger på hyddan – visa den när den vaknar.",
        "monster": "Baba Lysaga's Creeping Hut",
        "tokens": [
          {
            "name": "Baba Lysagas krypande hydda",
            "cell": [
              22,
              11
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "berez-mansion",
    "title": "Berez – Ulrichs herrgård (U2)",
    "mapHint": "ULRICHS HERRGARD",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 120
    },
    "groups": [
      {
        "area": "U2 Burgomaster Lazlo Ulrichs spöke",
        "note": "Neutral good ghost, stympad jätte med inälvorna hängande. Berättar Marinas öde om man frågar. Anfaller om hotad eller om gruppen letar skatter. Återuppstår efter 24 h vid 0 HP. Övertygas han om att Marina återfötts som Ireena får han ro.",
        "monster": "Ghost",
        "tokens": [
          {
            "name": "Lazlo Ulrich (Ghost)",
            "cell": [
              15,
              8
            ]
          }
        ]
      },
      {
        "area": "U2 Trädgården – ormar",
        "note": "Fyra giant poisonous snakes (2024: Giant Venomous Snake) anfaller den som går mer än 10 fot in i trädgården söder om ruinen. Placerade ungefärligt.",
        "monster": "Giant Venomous Snake",
        "tokens": [
          {
            "name": "Giant Venomous Snake 1",
            "cell": [
              10,
              15
            ]
          },
          {
            "name": "Giant Venomous Snake 2",
            "cell": [
              14,
              16
            ]
          },
          {
            "name": "Giant Venomous Snake 3",
            "cell": [
              18,
              15
            ]
          },
          {
            "name": "Giant Venomous Snake 4",
            "cell": [
              22,
              16
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "berez-goat-pen",
    "title": "Berez – gethagnet (U2)",
    "mapHint": "GETHAGNET",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 120
    },
    "groups": [
      {
        "area": "U2 Gethagnet",
        "note": "Nio getter fångade bakom ett stängsel med 50 människoskallar på stolparna. Ingen grind – Baba Lysaga flyger in med skallen. Skadas stängslet skriker skallarna och larmar henne.",
        "monster": "Goat",
        "tokens": [
          {
            "name": "Get 1",
            "cell": [
              14,
              6
            ]
          },
          {
            "name": "Get 2",
            "cell": [
              17,
              6
            ]
          },
          {
            "name": "Get 3",
            "cell": [
              19,
              7
            ]
          },
          {
            "name": "Get 4",
            "cell": [
              13,
              8
            ]
          },
          {
            "name": "Get 5",
            "cell": [
              16,
              8
            ]
          },
          {
            "name": "Get 6",
            "cell": [
              19,
              9
            ]
          },
          {
            "name": "Get 7",
            "cell": [
              14,
              10
            ]
          },
          {
            "name": "Get 8",
            "cell": [
              17,
              10
            ]
          },
          {
            "name": "Get 9",
            "cell": [
              16,
              12
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "berez-monument",
    "title": "Berez – Marinas monument (U5)",
    "mapHint": "MARINAS MONUMENT",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 120
    },
    "groups": [
      {
        "area": "U5 Uppsvällda lik",
        "note": "Sju uppsvällda lik (Commoner, fart 20 fot, immuna mot charmed/frightened) reser sig ur myren 60 fot väster om monumentet. Vid 0 HP spricker liket och en swarm of poisonous snakes (2024: Swarm of Venomous Snakes) väller ut. Gruppen kan lätt springa ifrån dem.",
        "monster": "Commoner",
        "tokens": [
          {
            "name": "Walking Corpse 1",
            "cell": [
              4,
              5
            ]
          },
          {
            "name": "Walking Corpse 2",
            "cell": [
              6,
              7
            ]
          },
          {
            "name": "Walking Corpse 3",
            "cell": [
              3,
              9
            ]
          },
          {
            "name": "Walking Corpse 4",
            "cell": [
              6,
              10
            ]
          },
          {
            "name": "Walking Corpse 5",
            "cell": [
              8,
              4
            ]
          },
          {
            "name": "Walking Corpse 6",
            "cell": [
              2,
              6
            ]
          },
          {
            "name": "Walking Corpse 7",
            "cell": [
              5,
              12
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "berez-stones",
    "title": "Berez – stenkretsen (U6)",
    "mapHint": "STENKRETSEN",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "U6 Muriel Vinshaw",
        "note": "Wereraven i människoskepnad (vän till Martikovs) signalerar med lykta. Berättar om Baba Lysaga, fågelskrämmorna och gethagnet. Undviker strid, flyr om hon anfalls och följer inte med.",
        "monster": "Wereraven",
        "tokens": [
          {
            "name": "Muriel Vinshaw (Wereraven)",
            "cell": [
              22,
              12
            ]
          }
        ]
      }
    ]
  },
  // ---------- Kapitel 15: Varulvsgrottan (Z) ----------
  {
    "id": "werewolf-den-camp",
    "title": "Varulvsgrottan – vakter, vargarna och källan (Z2–Z4)",
    "mapHint": "Z2-Z4 VARULVSGROTTAN",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "Z2 Vaktposten",
        "note": "Aziana och Davanka – varulvar i människoskepnad med spjut på en 5 fot hög avsats. Slår larm; oväsen här hörs i hela grottan och drar dit Z3 och Z5. Slåss till döden. Kartan är Beneos egen tolkning – placeringen är ungefärlig, flytta vid behov.",
        "monster": "Werewolf",
        "tokens": [
          {
            "name": "Aziana (Werewolf)",
            "cell": [
              26,
              21
            ]
          },
          {
            "name": "Davanka (Werewolf)",
            "cell": [
              28,
              21
            ]
          }
        ]
      },
      {
        "area": "Z3 Skennis",
        "note": "Gammal varulv (36 HP – sänk i Grimoire) spelar falskt på elektrumflöjt (250 gp) vid lägerelden; påse med fyra 50 gp-stenar. Döende: 'When Kiril returns, he'll skin you alive.' Kartan är Beneos egen tolkning – placeringen är ungefärlig, flytta vid behov.",
        "monster": "Werewolf",
        "tokens": [
          {
            "name": "Skennis (Werewolf, 36 HP)",
            "cell": [
              12,
              19
            ]
          }
        ]
      },
      {
        "area": "Z3 Vargarna",
        "note": "Nio vargar trycker sig bakom Skennis och följer honom.",
        "monster": "Wolf",
        "tokens": [
          {
            "name": "Varg 1",
            "cell": [
              9,
              18
            ]
          },
          {
            "name": "Varg 2",
            "cell": [
              10,
              18
            ]
          },
          {
            "name": "Varg 3",
            "cell": [
              11,
              17
            ]
          },
          {
            "name": "Varg 4",
            "cell": [
              9,
              20
            ]
          },
          {
            "name": "Varg 5",
            "cell": [
              10,
              21
            ]
          },
          {
            "name": "Varg 6",
            "cell": [
              11,
              22
            ]
          },
          {
            "name": "Varg 7",
            "cell": [
              14,
              17
            ]
          },
          {
            "name": "Varg 8",
            "cell": [
              14,
              21
            ]
          },
          {
            "name": "Varg 9",
            "cell": [
              13,
              23
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "werewolf-den-deep",
    "title": "Varulvsgrottan – djupa grottorna och Moder Natts helgedom (Z5–Z7)",
    "mapHint": "Z5-Z7 VARULVSGROTTAN",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "Z5a Bianca",
        "note": "Kirils maka, vithårig varulv i vargform, sover här och anfaller snabbt vid larm. Benen på golvet ger nackdel på Stealth. Kartan är Beneos egen tolkning – placeringen är ungefärlig, flytta vid behov.",
        "monster": "Werewolf",
        "tokens": [
          {
            "name": "Bianca (Werewolf)",
            "cell": [
              8,
              20
            ]
          }
        ]
      },
      {
        "area": "Z5b Wensencia och Kellen",
        "note": "Wensencia (varulv, vargform) sover med Kellen (10 år, AC 10, 2 HP, varulvsimmunitet) som kramar en Blinsky-docka. Vid larm låser hon in Kellen i en tom bur i Z7. Greater restoration/remove curse botar Kellen. Kartan är Beneos egen tolkning – placeringen är ungefärlig, flytta vid behov.",
        "monster": "Werewolf",
        "tokens": [
          {
            "name": "Wensencia (Werewolf)",
            "cell": [
              22,
              23
            ]
          }
        ]
      },
      {
        "area": "Z5b Kellen",
        "note": "Kellen – icke-stridande (AC 10, 2 HP).",
        "monster": "Commoner",
        "tokens": [
          {
            "name": "Kellen (2 HP)",
            "cell": [
              23,
              23
            ]
          }
        ]
      },
      {
        "area": "Z7 Zuleika Toranescu",
        "note": "Emils maka knäböjer framför Moder Natts staty. Vaktar barnen på Kirils order. Återförs Emil (K75a) släpper hon barnen; annars kan hon släppa dem om gruppen dödar Kiril. Skatten vid statyn är förbannad (mardrömmar – ingen vila nattetid). Kartan är Beneos egen tolkning – placeringen är ungefärlig, flytta vid behov.",
        "monster": "Werewolf",
        "tokens": [
          {
            "name": "Zuleika Toranescu (Werewolf)",
            "cell": [
              38,
              11
            ]
          }
        ]
      },
      {
        "area": "Z7 Barnen i burarna",
        "note": "Åtta barn (AC 10, 1 HP, 1d6+6 år) parvis i fyra av sex burar med stenar på locken. I chock – går inte långt från gruppen. Tas de härifrån medan Kiril lever jagar han dem.",
        "monster": "Commoner",
        "tokens": [
          {
            "name": "Barn 1 (1 HP)",
            "cell": [
              33,
              5
            ]
          },
          {
            "name": "Barn 2 (1 HP)",
            "cell": [
              34,
              5
            ]
          },
          {
            "name": "Barn 3 (1 HP)",
            "cell": [
              40,
              15
            ]
          },
          {
            "name": "Barn 4 (1 HP)",
            "cell": [
              41,
              15
            ]
          },
          {
            "name": "Barn 5 (1 HP)",
            "cell": [
              38,
              19
            ]
          },
          {
            "name": "Barn 6 (1 HP)",
            "cell": [
              39,
              19
            ]
          },
          {
            "name": "Barn 7 (1 HP)",
            "cell": [
              42,
              14
            ]
          },
          {
            "name": "Barn 8 (1 HP)",
            "cell": [
              42,
              13
            ]
          }
        ]
      },
      {
        "area": "Z6 Kirils grotta (oftast tom)",
        "note": "Kiril sover här i vargform när han är hemma. Bakom ett förhänge av människohud: trappa upp till hemlig dörr → Z8. Jaktlaget (Kiril 90 HP, sex varulvar, nio vargar) kommer tillbaka på 18+ på d20 varje timme – läggs inte ut automatiskt. Kartan är Beneos egen tolkning – placeringen är ungefärlig, flytta vid behov.",
        "monster": "Werewolf",
        "tokens": []
      }
    ]
  },
  // ---------- Kapitel 9: Tsolenka Pass (T) ----------
  {
    "id": "tsolenka-gate",
    "title": "Tsolenka Pass – porthuset (T1–T3)",
    "mapHint": "X2 TSOLENKA PASS - PORTEN",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "T2 Demonstatyerna",
        "note": "Två förstenade vrocks på porthuset. Väcks om de anfalls eller om gruppen flyger/klättrar förbi porten; jagar flyende och slåss till döden. Fallgallret höjs av sig självt inom 10 fot (1 minut). T3: grön eldridå – 33 (6d10) fire; dispel magic DC 16 dämpar 1 minut.",
        "monster": "Vrock",
        "tokens": [
          {
            "name": "Vrock 1 (staty)",
            "cell": [
              29.5,
              7.5
            ]
          },
          {
            "name": "Vrock 2 (staty)",
            "cell": [
              29.5,
              12.5
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "tsolenka-bridge",
    "title": "Tsolenka Pass – stenbron (T7–T9)",
    "mapHint": "X4 TSOLENKA PASS - BRON",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 80
    },
    "groups": [
      {
        "area": "T8 Den svartklädda ryttaren",
        "note": "En manifestation av Strahd på en kolsvart häst mitt på bron – en varning. Interagerar gruppen med den skingras den som aska. Bron är 90 fot lång, 500 fot ovan Luna River. På väg tillbaka (öst→väst): Roc of Mount Ghakis dyker mot bron – griper häst/mula om sådan finns, annars en rollperson; når inte in i vaktrummen.",
        "monster": "Strahd von Zarovich",
        "tokens": [
          {
            "name": "Strahds manifestation (försvinner vid kontakt)",
            "cell": [
              24,
              11
            ]
          }
        ]
      },
      {
        "area": "Roc of Mount Ghakis (händelse)",
        "note": "Läggs ut vid behov – Gargantuan, 248 HP.",
        "monster": "Roc",
        "tokens": []
      }
    ]
  },
  {
    "id": "tsolenka-rooftop",
    "title": "Tsolenka Pass – tornets tak (T6)",
    "mapHint": "TORNETS TAK",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 120
    },
    "groups": [
      {
        "area": "T6 Snöjungfrurna (bara om Tarokka-skatten är här)",
        "note": "Sex snow maidens (Specter, immuna mot kyla, Life Drain gör kyla). 'Begone! The treasure is ours!' Lämnar gruppen inte taket anfaller de. När den sista besegrats dyker skatten upp i snön.",
        "monster": "Specter",
        "tokens": [
          {
            "name": "Snow Maiden 1",
            "cell": [
              16,
              7
            ]
          },
          {
            "name": "Snow Maiden 2",
            "cell": [
              19,
              7
            ]
          },
          {
            "name": "Snow Maiden 3",
            "cell": [
              15,
              9
            ]
          },
          {
            "name": "Snow Maiden 4",
            "cell": [
              19,
              9
            ]
          },
          {
            "name": "Snow Maiden 5",
            "cell": [
              16,
              10
            ]
          },
          {
            "name": "Snow Maiden 6",
            "cell": [
              19,
              10
            ]
          }
        ]
      }
    ]
  },
  // ---------- Kapitel 13: Amber Temple (X) ----------
  {
    "id": "amber-temple-x5",
    "title": "Amber Temple – tempelhallen (X5)",
    "mapHint": "AMBER TEMPLE - 1F MITTEN",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 120
    },
    "groups": [
      {
        "area": "X5a Neferon i statyns huvud",
        "note": "Arcanaloth i magiskt mörker inne i den stora statyns ihåliga huvud (dispel DC 17); ser genom ögonhålen och anfaller med långdistansbesvärjelser. Truesight. Utger sig för att vara den gamle trollkarlen 'Heinrich Stolt'. Bär guldglasögon (250 gp) och robe of useful items. Rahadin lämnas ifred. Kartan är Beneos tolkning – placeringen är ungefärlig.",
        "monster": "Arcanaloth",
        "tokens": [
          {
            "name": "Neferon (Arcanaloth)",
            "cell": [
              25,
              9
            ]
          }
        ]
      },
      {
        "area": "X17 Flamskallar vid skottgluggarna",
        "note": "När Neferon börjar kasta tar tre flameskulls från X17 plats bakom skottgluggarna och kastar magic missile/fireball. Lämnar inte hallen X17. Lagda vid västra väggen – flytta till gluggarna.",
        "monster": "Flameskull",
        "tokens": [
          {
            "name": "Flameskull X17-1",
            "cell": [
              5,
              3
            ]
          },
          {
            "name": "Flameskull X17-2",
            "cell": [
              5,
              9
            ]
          },
          {
            "name": "Flameskull X17-3",
            "cell": [
              5,
              15
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "amber-temple-x9",
    "title": "Amber Temple – föreläsningssalen (X9)",
    "mapHint": "AMBER TEMPLE - 1F SODER",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 120
    },
    "groups": [
      {
        "area": "X9 Vilnius bakom katedern",
        "note": "Bränd lärling (Mage) gömmer sig bakom katedern (passiv Perception 17, eller DC 12). Girig, förrädisk feg. Bär Master's Amulet (1000 gp) till shield guardian i X35 – vet inte vad den gör. Kartan är Beneos tolkning – placeringen är ungefärlig.",
        "monster": "Mage",
        "tokens": [
          {
            "name": "Vilnius (Mage)",
            "cell": [
              17,
              10
            ]
          }
        ]
      },
      {
        "area": "X9 Osynlig quasit",
        "note": "Vilnius osynliga familiar.",
        "monster": "Quasit",
        "tokens": [
          {
            "name": "Quasit (osynlig)",
            "cell": [
              18,
              10
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "amber-temple-x32",
    "title": "Amber Temple – nedre östra hallen (X32)",
    "mapHint": "AMBER TEMPLE - B1 SODER",
    "map": {
      "width": 3840,
      "height": 2160,
      "cell": 120
    },
    "groups": [
      {
        "area": "X32 Tre häxor vid södra dörren",
        "note": "Tre Barovian witches provar lösenord på bärnstensdörren till X33a (vet inte om schaktet från X6). Arga – anfaller. Två döda: den tredje flyger iväg på kvasten (broom of animated attack). Kartan är Beneos tolkning – placeringen är ungefärlig.",
        "monster": "Barovian Witch",
        "tokens": [
          {
            "name": "Barovian Witch 1",
            "cell": [
              9,
              6
            ]
          },
          {
            "name": "Barovian Witch 2",
            "cell": [
              10,
              6
            ]
          },
          {
            "name": "Barovian Witch 3",
            "cell": [
              11,
              6
            ]
          }
        ]
      },
      {
        "area": "X33a Shalx-valvet",
        "note": "Tre flameskulls vaktar valvet och anfaller direkt. (Valven i söder – stäm av rummet mot bokens karta.)",
        "monster": "Flameskull",
        "tokens": [
          {
            "name": "Flameskull X33a-1",
            "cell": [
              9,
              10
            ]
          },
          {
            "name": "Flameskull X33a-2",
            "cell": [
              9,
              9
            ]
          },
          {
            "name": "Flameskull X33a-3",
            "cell": [
              11,
              9
            ]
          }
        ]
      }
    ]
  },
];
