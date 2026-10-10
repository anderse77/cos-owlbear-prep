// Slumpmöten i Barovia enligt Curse of Strahd kapitel 2 ("Random Encounters") och
// husinvånare i byn Barovia enligt kapitel 3 ("House Occupants").
// Texterna är korta egna sammanfattningar för spelledaren – läs boken för detaljer.
// creatures: [monsternamn i MONSTERS, tärningsuttryck]

export const ENCOUNTER_RULES = {
  everyMinutes: 30,
  road: 18, // d20 >= 18 på väg
  wilderness: 15, // d20 >= 15 i vildmarken
  note: "Slå inte om gruppen redan haft två slumpmöten utomhus de senaste 12 timmarna. Strahds spioner kan dyka upp i stället för ett möte.",
};

const TRAVEL = "Bara om gruppen färdas – annars inget möte.";

const COMMON = {
  trap: { title: "Jaktfälla", text: `${TRAVEL} Främsta ledet slår DC 15 Wisdom (Survival). Lyckas ingen kliver en slumpad karaktär i en rostig vargfälla (regler: PHB, Equipment).` },
  grave: { title: "Grav", text: `${TRAVEL} 25 % orörd jordhög/röse (skelett i rostig ringbrynja, korroderade vapen), annars plundrad grop med några ben.` },
  trail: { title: "Falsk stig", text: `${TRAVEL} Stig lagd av onda druider. Åt båda hållen leder den till en spetsgrop dold under en presenning av kvistar (DMG, Sample Traps).` },
  trinket: { title: "Trinket", text: "En slumpad karaktär hittar en trinket (Appendix A)." },
  bundle: { title: "Gömt bylte", text: `${TRAVEL} Läderbylte med ett par barovianska vardagskläder. De tillhör en wereraven eller en varulv.` },
  corpse: { title: "Lik", text: `${TRAVEL} Slå d6: 1–2 varg dödad av spjut och armborst; 3–5 barovian sliten i stycken av dire wolves (scouts i sällskap känner igen den saknade); 6 ser ut som en av karaktärerna, avklädd – köttet smälter bort om den flyttas.`, d6: true },
  rider: { title: "Skelettryttare", text: "Skelett på skeletthäst i trasig ringbrynja, med en lykta som inte lyser. Ignorerar gruppen om de inte anfalls. Förstörs båda kan mötet inte hända igen.", creatures: [["Skeleton", "1"], ["Warhorse Skeleton", "1"]] },
  direwolves: { title: "Dire wolves", text: "Strahds trogna tjänare, kan inte charmas eller skrämmas. Fler syns som skuggor i dimman (sikten är skymd).", creatures: [["Dire Wolf", "1d6"]] },
  wolves: { title: "Vargar", text: "Ylandet kommer närmare – några minuter att förbereda sig. Lyder Strahd, kan inte charmas eller skrämmas.", creatures: [["Wolf", "3d6"]] },
  berserkers: { title: "Berserkers", text: "Lerinsmorda bergsfolk med stenyxor, fördel på Stealth. Drar sig undan om de upptäcks; anfaller bara om de trängs eller hotas.", creatures: [["Berserker", "1d4"]] },
  druid: { title: "Druid och twig blights", text: "Vild druid som dyrkar Strahd. Blightsen slåss till döden. Druiden flyr mot Yester Hill om alla blights dör eller den förlorar mer än halva sin HP.", creatures: [["Druid", "1"], ["Twig Blight", "2d6"]] },
  needles: { title: "Needle blights", text: "Tjänar Barovias onda druider. Gruppen kan försöka gömma sig om den rör sig tyst utan ljus.", creatures: [["Needle Blight", "2d4"]] },
  scarecrows: { title: "Fågelskrämmor", text: "Någon med passiv Perception 11+ ser dem komma, annars blir gruppen överraskad. Baba Lysagas skapelser som jagar korpar och wereravens.", creatures: [["Scarecrow", "1d6"]] },
  revenant: { title: "Revenant", text: "Riddare av Silverdrakens orden i trasig ringbrynja (AC 13), två tvåhandsattacker med långsvärd (2d10+4). Anfalls den tror den att ni tjänar Strahd. Är ni Strahds fiender: uppmanar er att söka Vladimir Horngaard i Argynvostholt.", creatures: [["Revenant", "1"]] },
};

export const DAY = {
  2: { title: "Barovianska bybor", text: "Facklor och högafflar i dimman (högaffel +2, 1d6 stick). En familj på flykt eller en arg mobb. Gruppen kan gömma sig om den rör sig tyst utan ljus.", creatures: [["Commoner", "3d6"]] },
  3: { title: "Barovianska jägare", text: "Med passiv Perception 16+ ses en som siktar med armborst (lätt armborst +4, 80/320 ft, 1d8+2). Letar efter en försvunnen person och ber om hjälp; avböjer ni pekar de mot närmaste by.", creatures: [["Scout", "1d6"]] },
  4: COMMON.trap,
  5: COMMON.grave,
  6: COMMON.trail,
  7: { title: "Vistani-banditer", text: "Pipröksdoft och skratt. Söker gravar att plundra eller jagar småvilt. Guidar för 100 gp – då slås bara d12 för möten och vargar lämnar er i fred. En bär 2d4 ädelstenar à 50 gp. (Statblock: Bandit.)", creatures: [["Bandit", "1d4+1"]] },
  8: COMMON.rider,
  9: COMMON.trinket,
  10: COMMON.bundle,
  11: { title: "Korpar eller wereraven", text: "50 %: 1d4 korpsvärmar som följer och vakar över gruppen, och hjälper till i nästa strid om de lämnas ifred. 50 %: en wereraven i korpform som skuggar gruppen 1d4 timmar (Stealth mot passiv Perception). Andra wereraven-mötet: den presenterar sig och ber er gå till Blue Water Inn i Vallaki.", split: [["Swarm of Ravens", "1d4"], ["Wereraven", "1"]] },
  12: COMMON.direwolves,
  13: COMMON.wolves,
  14: COMMON.berserkers,
  15: COMMON.corpse,
  16: { title: "Varulvar i människoform", text: "Utger sig för pälsjägare (stor man, grå mantel, spjut). Fler inom vissling. Kollar om ni har silvervapen – saknas sådana byter de form och anfaller, annars går de.", creatures: [["Werewolf", "1d6"]] },
  17: COMMON.druid,
  18: COMMON.needles,
  19: COMMON.scarecrows,
  20: COMMON.revenant,
};

export const NIGHT = {
  2: { title: "Spöke", text: "Ett hämndlystet spöke hväser att ingen någonsin ska få veta att ni dog här, och anfaller. Besätter det någon leds värden till Ravenlofts portar (område J) och kastas i avgrunden.", creatures: [["Ghost", "1"]] },
  3: COMMON.trap,
  4: COMMON.grave,
  5: COMMON.trinket,
  6: COMMON.corpse,
  7: COMMON.bundle,
  8: COMMON.rider,
  9: { title: "Fladdermössvärmar", text: "Strahds tjänare. Anfaller utan förvarning.", creatures: [["Swarm of Bats", "1d8"]] },
  10: COMMON.direwolves,
  11: COMMON.wolves,
  12: COMMON.berserkers,
  13: COMMON.druid,
  14: COMMON.needles,
  15: { title: "Varulvar i vargform", text: "Ett ylande på avstånd. De följer gruppen i timmar. Slår deras Stealth över passiv Perception anfaller de överraskande vid vila, annars när gruppen är försvagad efter ett annat möte. Lyan ligger vid Lake Baratok (område Z).", creatures: [["Werewolf", "1d6"]] },
  16: { title: "Zombier", text: "Stank av ruttet kött; barovianer som fallit offer för landets ondska.", creatures: [["Zombie", "3d6"]] },
  17: COMMON.scarecrows,
  18: { title: "Strahd-zombier", text: "Dödsstank och knäckta kvistar. Forna vakter på Ravenloft i trasig livré; anfaller levande direkt. Gruppen kan gömma sig om den rör sig tyst utan ljus.", creatures: [["Strahd Zombie", "1d8"]] },
  19: { title: "Irrbloss (bara en gång)", text: "En fladdrande fackla långt bort leder till ett raserat torn (vanhelgad mark). Rör de den tomma kistan där inne bryter 3d6 zombier upp ur jordgolvet och irrblosset blir synligt och anfaller. Händer det igen: inget möte.", creatures: [["Will-o'-Wisp", "1"], ["Zombie", "3d6"]], once: true },
  20: COMMON.revenant,
};

// Kapitel 3: hus i byn Barovia (utom Mad Marys hus och borgmästarens hus). Slå d20.
export const HOUSES = [
  { min: 1, max: 3, title: "Tomt", text: "Ingen bor här." },
  { min: 4, max: 8, title: "Råttor", text: "Huset ser övergivet ut. Råttorna är Strahds tjänare och anfaller när gruppen utforskar insidan.", creatures: [["Swarm of Rats", "2d4"]] },
  { min: 9, max: 16, title: "Barovianska bybor", text: "1d4 vuxna (Commoner) och 1d8−1 barn. Lyssnar man vid dörren hörs viskningar. Vill inte prata med främlingar, anfaller aldrig först och flyr hellre. På natten kurar de vid levande ljus med hemgjorda heliga symboler.", creatures: [["Commoner", "1d4"]], extra: ["Barn (ingen strid)", "1d8-1"] },
  { min: 17, max: 20, title: "Strahd-zombier", text: "Dödsstank när dörr eller fönsterlucka öppnas. Går gruppen in samlas zombierna där de är.", creatures: [["Strahd Zombie", "2d4"]] },
];
