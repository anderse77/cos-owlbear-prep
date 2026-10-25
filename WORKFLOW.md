# Arbetsgång: förbereda en plats i Curse of Strahd för Owlbear Rodeo

Det här är stegen Claude följer för att förbereda en ny plats (karta, monster, statblock) så att
spelledaren bara behöver importera scenen och trycka på en knapp i CoS Prep.

## Förutsättningar (sätts upp en gång)

| Sak | Var |
|---|---|
| Beneos-mappen | `J:\Beneo curse of strahd` på spelledarens dator (nås via datorlänken, mappen heter `~/mnt/Beneo curse of strahd`) |
| Färdiga filer till Owlbear | `J:\Beneo curse of strahd\Owlbear_ready\<nr> <plats>\` |
| Tillägget CoS Prep | repo `anderse77/cos-owlbear-prep`, publiceras via GitHub Pages: `https://anderse77.github.io/cos-owlbear-prep/manifest.json` |
| Owlbear-rummet | "The Fine Deep" |
| Statblock | Tabletop Almanac (TA), konto anderse77. Max 20 egna statblock. |
| Regelversion | 2024-statblock (slug `-wotcsrd`). Finns inget 2024-block: bokens 2014-värden som eget statblock. |

**Regler från spelledaren:** radera aldrig filer i Beneos-mappen; inga månadskostnader; ändra inget i
rummet utan att säga till; rör aldrig befintliga scener (t.ex. B1/B2) utan lov.

## 1. Läs boken

Bokens text finns som 5etools-data på GitHub (publikt repo, hämtas med sparse checkout):

```bash
git clone -q --depth 1 --filter=blob:none --sparse https://github.com/5etools-mirror-3/5etools-src.git src
cd src && git sparse-checkout set --no-cone /data/adventure/adventure-cos.json /data/bestiary/bestiary-cos.json /data/bestiary/bestiary-mm.json /data/bestiary/bestiary-vrgr.json
```

`adventureData[0].data[i]` är kapitlen (index 3 = kapitel 2, index 4 = kapitel 3, index 19 = Death House).
Plocka ut: rum/område, vilka varelser, antal, var de står och vad som utlöser dem. Tabellrader har
`roll.exact`/`roll.min..max` i första cellen.

## 2. Hitta kartor och tokens i Beneos-mappen

- Kartor: `Beneos_Battlemaps_Pack_0NN_Free-*/…/<nr>_<namn>/<namn>-4K_Still_Battlemap_GRIDDED.png`
  (finns ingen GRIDDED: ta GRIDLESS). Packarna är redan uppackade; zip-filerna ligger bredvid.
- Rutstorlek: kör en fasanpassning (FFT) på `…GRID_ONLY_40.png`. Death House-källaren och Svalich-kartorna
  har 120 px/ruta (32×18). De flesta bykartor har 36×20 (106,7×108 px – inte helt kvadratiska).
- Tokens: `Beneos-Creatures-Bulk-All/<nr>-<namn>/<namn>-1-top.webp` (ovanifrån) eller `-1-token.webp` (rund).
  SRD-varelser heter `000-srd_<namn>`.
- Gör Owlbear-färdiga filer med Python/PIL på datorn: webp, kvalitet 82, full 4K-upplösning.
  Filnamnet ska innehålla rutnätet, t.ex. `08 E5g Kyrkans kallare (Doru) - 36x20 rutor.webp`.
- Skriv en `LAS MIG - import till Owlbear.txt` i platsens mapp.

## 3. Statblock i Tabletop Almanac

1. Sök slug: `GET https://api.tabletop-almanac.com/api/v1/e5/statblock/search/?search_string=<namn>`
   (fungerar bara från owlbear.rodeo eller tabletop-almanac.com – kör i webbläsarrutan, inte från github.io).
2. Välj `-wotcsrd` (2024). Inte `-wotc-srd` (2014) eller `-menagerie`.
3. Saknas 2024-version: gör eget statblock från bokens data (se `ta/` i arbetsmappen för mallen) och
   ladda upp: `/statblocks/new?system=e5` → fliken "Json (+AI)" (`li.tab`) → sätt `textarea.json-statblock`
   med native setter + `input`-event → Submit (fyller formuläret) → kontrollera namn → spara.
   Spelledaren måste vara inloggad; Claude loggar aldrig in.
4. Uppdatera befintligt statblock: importera som utkast ("Save Draft"), öppna
   `/statblocks/edit?system=e5&slug=<slug>`, välj utkastet i Drafts-listan (`change`-event), sätt tillbaka
   namnet, Submit. Kontrollera HP/AC i listan efteråt.
5. Vilotyper måste heta exakt `"Short Rest"` / `"Long Rest"`.

## 4. Lägg in platsen i tillägget

- `locations.js`: lägg varelsen i `MONSTERS` (slug, storlek, inbyggda värden `stats` = hp, ac, init, limits
  hämtade från TA – TA:s API tillåter inte anrop från github.io) och platsen i `LOCATIONS`
  (kartans storlek, rutstorlek, `origin` = första rutlinjen i pixlar, och rutor `[kolumn, rad]`).
- Slumpmöten och husinvånare ligger i `encounters.js`.
- Höj versionen i `index.html` (`?v=` och etiketten) – GitHub Pages cachar ca 10 minuter.
- Commit + push till `main`. Avsluta commit-meddelandet med attributionsraderna.

## 5. I Owlbear (spelledaren gör, Claude kontrollerar)

1. Scenes → Add → New, dra in kartfilen, skriv in kolumner × rader från filnamnet.
2. Öppna CoS Prep, välj platsen, **Placera dolda monster**, sedan **Kontrollera placering**.
3. Saknas en bild öppnar tillägget bildväljaren med monstrets namn ifyllt; välj Beneos-tokenen en gång.

Claude kan inte byta scen eller ladda upp filer i Owlbear från webbläsarrutan (dubbelklick och
dra-och-släpp fungerar inte där). Claude kan läsa tillägget, klicka på dess knappar och ta skärmbilder.

## 6. Kontroll innan klart

- Varje monster: rätt antal, rätt ruta (Kontrollera placering), dolt, kopplat till rätt slug, rätt HP.
- Jämför placering mot bokens text, inte mot minnet.
- Säg tydligt vad som inte är kontrollerat.

## 7. Automatisk statblock-koppling (v1.3.0)

`background.js` körs i bakgrunden (manifestets `background_url`) hos spelledaren. När en token dras in
i en scen kopplas den automatiskt:
- Spelare (namnet = namnet i `players.js`, t.ex. "River" eller "River2") → spelarens `-anderse77`-statblock.
- Monster med exakt samma namn som i `MONSTERS` → rätt statblock, men bara om Grimoire inte kopplat något
  eller kopplat en annan version av samma monster (ghoul-wotc-srd → ghoul-wotcsrd).
Senaste kopplingarna sparas i scenens metadata och visas med "Visa automatiska kopplingar".
Tillägget "Persistent Tokens" kan återställa gammal Grimoire-data när en token dras in; bakgrunden rättar
det efteråt (högst 3 gånger per token).

**Obs:** Owlbear validerar manifestet – `description` får vara högst 128 tecken, annars laddas tillägget inte.
**Obs:** GM's Grimoire 4.0 släpps 9 november 2026 med ny backend. Kontrollera då att `GMG_KEY` och
metadataformatet fortfarande stämmer.

## 8. Scener kan skapas av Claude

Asset Manager → Scenes → ADD → filväljaren (`file_upload`) → Owlbear läser `22x22` ur filnamnet →
Import. Scenen skapas utan att aktuell scen byts. Tokens: fliken Characters → ADD → Size "Set Columns" = 1.
