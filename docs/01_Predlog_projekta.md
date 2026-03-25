# Sistem za hitro in enostavno oceno vrednosti rabljenih avtomobilov

Ekipa 15: Niko Kralj, Miha Janežič, Zoja Jakopin, Lian Arl, Živa Lavrič

# 0 Projektna ideja

## 0.1 Ozadje

Pri nakupu ali prodaji rabljenega avtomobila je določanje primerne cene pogosto zahtevno. Cena je odvisna od več dejavnikov, kot so: znamka, model, letnik, število prevoženih kilometrov in druge lastnosti vozila. Tako prodajalci kot kupci se pri tem pogosto zanašajo na primerjavo z obstoječimi oglasi na spletu. Takšen pristop je lahko zamuden in ne zagotavlja nujno realne ocene vrednosti vozila. Zato obstaja potreba po rešitvi, ki bi na podlagi javno dostopnih podatkovnih zbirk uporabnikom omogočila oceniti realno tržno vrednost rabljenega avtomobila.

## 0.2 Področje in motivacija

Na trgu rabljenih avtomobilov pogosto prihaja do velikih razlik med realno vrednostjo vozila in ceno, ki jo postavi prodajalec. Kupci zato težko ocenijo, ali je cena primerna, prodajalci pa niso prepričani, kakšno ceno bi bilo logično postaviti. Zato želimo razviti spletno aplikacijo, ki bo na podlagi javne podatkovne zbirke rabljenih avtomobilov ter metode linearne regresije ocenila tržno vrednost vozila glede na njegove lastnosti.

## 0.3 Namen projekta

Namen projekta je razviti brezplačno rešitev, ki slovenskemu uporabniku omogoča vnos osnovnih lastnosti o rabljenem avtomobilu iz nemškega trga iz katerih bo izračunana njegova predvidena tržna vrednost. Sistem bo temeljil na linearnem regresijskem modelu, ki bo treniran na javni podatkovni zbirki rabljenih avtomobilov iz nemškega trga. Aplikacija bo uporabniku poleg cene prikazala tudi približen cenovni razpon, kar bi pomagalo pri odločitvah pri nakupu ali prodaji vozila. Na začetku bo sistem podpiral le omejen nabor avtomobilov, saj bo tako obdelava podatkov bolj obvladljiva.

## 0.4 Cilji

Glej poglavje [3 Cilji projekta](#3-cilji-projekta).

## 0.5 Smernice

Pri implementaciji rešitve bomo upoštevali naslednje smernice:

- Sistem naj bi bil enostaven za uporabo in naj bi omogočal hitro pridobitev ocene cene avtomobila

- Rešitev naj bi bila prilagojena različnim napravam in brskalnikom

- Sistem naj bi zagotavljal zanesljivo delovanje in stabilno napovedovanje cene

- Pri implementaciji sistema naj bi bilo čim manj napak

- Dizajn aplikacije naj bi bil preprost in razumljiv

- Uporabniška izkušnja naj bi bila intuitivna

## 0.6 Ciljna skupina in končni uporabniki

Glej poglavje [2 Potrebe naročnika](#2-potrebe-naročnika).

<br>

# 1 Uvod

Projekt obravnava problem določanja primerne cene rabljenega avtomobila pri nakupu ali prodaji na nemškem trgu. Uporabniki se danes pogosto zanašajo na ročno primerjanje spletnih oglasov, kar je zamudno in ne vodi vedno do realne ocene vrednosti vozila. Namen našega projekta je razviti spletno aplikacijo, ki bo uporabniku na podlagi vnosa osnovnih podatkov o vozilu, kot so znamka, model, letnik in število prevoženih kilometrov, prikazala okvirno tržno vrednost avtomobila. Rešitev bo temeljila na modelu strojnega učenja, naučenem na javno dostopni zbirki podatkov rabljenih avtomobilov iz Nemčije, in bo uporabnikom pomagala pri sprejemanju bolj informiranih odločitev pri nakupu ali prodaji vozila.

## 1.1 Izzivi

Obdelava podatkov: prvi izziv bo pridobivanje in priprava kakovostnih podatkov za učenje modela, saj je treba podatke očistiti, urediti manjkajoče vrednosti in izbrati lastnosti, ki najbolj vplivajo na ceno vozila. Ta izziv bomo naslovili s predobdelavo podatkov in postopnim preverjanjem kakovosti podatkovnega seta.

Razvoj modela strojnega učenja: drugi izziv bo izdelava dovolj natančnega modela za napovedovanje cen. Ker cena rabljenega vozila ni odvisna le od enega dejavnika, bo treba pravilno izbrati vhodne podatke ter preveriti, kako dobro model deluje v praksi. To bomo naslovili s testiranjem različnih pristopov, z evalvacijo modela na ločenih testnih podatkih in z analizo dobljenih rezultatov.

Razvoj in integracija sistema: zadnji izziv predstavlja povezava med posameznimi komponentami sistema, kot so uporabniški vmesnik, zaledni strežnik in model za napovedovanje cen. Sistem mora omogočati enostaven vnos podatkov ter hitro in razumljivo prikazati rezultat uporabniku. Ta izziv bomo naslovili z jasno arhitekturo sistema ter postopnim testiranjem delovanja aplikacije med razvojem.

Za ekipo so uporabljene tehnologije delno znane, delno pa nove. Osnovno spletno programiranje in delo v Pythonu je ekipi poznano, medtem ko so področja, kot so priprava podatkov, učenje regresijskega modela in povezava modela z backend rešitvijo, za nekatere člane nova. Zato bomo nove tehnologije osvajali postopoma, z delitvijo nalog glede na predznanje, s sprotnim učenjem in medsebojno pomočjo znotraj ekipe.

<br>

# 2 Potrebe naročnika

**2.0.1 Primarni naročnik**

Primarni naročnik projekta so uporabniki, ki želijo oceniti vrednost rabljenega avtomobila (kupci in prodajalci vozil). Ti uporabniki potrebujejo hitro in natančno oceno vrednosti avtomobila na podlagi njegovih lastnosti za lažjo izbiro nakupa/prodaje.

**2.0.2 Sekundarni deležniki**

Sekundarni deležniki so skrbniki in avtorji javno dostopnih podatkovnih zbirk, ki služijo kot vir podatkov za učenje našega modela. Čeprav niso neposredni uporabniki aplikacije, so pomembni za razvoj rešitve, saj zagotavljajo strukturirane podatke o vozilih.

**2.0.3 Želje deležnikov**

Primarni deležniki želijo enostavno orodje, ki jim omogoča preprosto in hitro oceno vrednosti vozila brez dolgotrajnega iskanja informacij. Sekundarni deležniki (skrbniki podatkovnih zbirk) pa želijo, da se njihovi podatki uporabljajo odgovorno, da so navedeni viri in da je uporaba podatkov skladna z licenčnimi pogoji.

**2.0.4 Splošna izkušnja**

Želena splošna uporabniška izkušnja naj bi bila preprosta in intuitivna. Uporabnik naj bi lahko z nekaj vnosi hitro dobil natančno vrednost avtomobila. Za skrbnike podatkov pa naj bi bila izkušnja povezana s pravilnim ravnanjem podatkov in navajanjem virov.

**2.1 Uporabniške zahteve**

Business value (poslovno vrednost) definiramo kot skalo od 1-10, kjer 1 pomeni zelo majhno dodano korist za poslovanje podjetja, 10 pa predstavlja zelo veliko dodano korist za poslovanje podjetja.

### 2.1.1 Uporabniške zgodbe in testi sprejemljivosti

**1. Vnos osnovnih podatkov o vozilu (Must have)**

Kot prodajalec avtomobila želim vnesti osnovne podatke o avtomobilu (znamka, model, letnik), da lahko dobim oceno za koliko denarja naj vozilo prodam.

- Glede na to, da sem na strani za oceno cene avtomobila, ko vnesem vse zahtevane osnovne podatke in oddam obrazec, mi sistem prikaže ocenjeno vrednost vozila.

Business value: 10

**2. Prikaz cene za kupca (Must have)**

Kot kupec avtomobila želim vnesti osnovne podatke o avtomobilu (znamka, model, letnik ipd.), da lahko dobim oceno za koliko denarja naj vozilo kupim.

- Glede na to, da sem na strani za oceno cene avtomobila, ko vnesem vse zahtevane podatke in oddam obrazec, mi sistem prikaže za koliko denarja naj vozilo kupim.

Business value: 10

**3. Preverjanje pravilnosti vnosa (Must have)**

Kot uporabnik želim, da sistem preveri pravilnost vnesenih podatkov, da mi onemogoči napačne vnose.

- Glede na to, da izpolnjujem obrazec za vnos lastnosti vozila, mora sistem prikazati opozorilo in zahtevati popravek, ko vnesem neveljavne podatke.

Business value: 4

**4. Hiter izračun cene (Must have)**

Kot uporabnik želim hitro prejeti napoved cene avtomobila, da lahko brez čakanja ocenim njegovo vrednost.

- Glede na to, da sem vnesel podatke o vozilu, ko sistem izvede izračun, je rezultat prikazan v kratkem času.

Business value: 7

**5. Pregleden uporabniški vmesnik (Should have)**

Kot uporabnik, ki nima veliko tehničnega znanja, želim enostaven in pregleden uporabniški vmesnik, da lahko brez težav uporabljam aplikacijo.

- Glede na to, da aplikacijo uporabljam prvič, ko odprem stran za oceno vrednosti vozila, hitro najdem polje za vnos podatkov in razumem, katere informacije moram vnesti.

Business value: 7

**6. Prikaz cenovnega razpona (Could have)**

Kot uporabnik želim videti tudi cenovni razpon vozila, da lahko bolje razumem realno vrednost avtomobila.

- Glede na to, da sistem izračuna oceno vozila, ko prikaže rezultat, poleg cene prikaže tudi cenovni razpon.

Business value: 5

**7. Podpora različnim spletnim brskalnikom (Should have)**

Kot uporabnik želim uporabljati aplikacijo na različnih spletnih brskalnikih, da lahko dostopam do aplikacije ne glede na brskalnik, ki ga uporabljam.

- Glede na to, da odprem aplikacijo v poljubnem spletnem brskalniku, ko se stran naloži, se ta pravilno prikaže in omogoča uporabo vseh funkcionalnosti.

Business value: 8

**8. Ponastavitev obrazca (Could have)**

Kot uporabnik želim imeti možnost resetirati vnesene podatke, da lahko hitro vnesem podatke za drugo vozilo.

- Glede na to, da sem vnesel podatke v obrazec, ko kliknem gumb za ponastavitev, se vsa polja obrazca izbrišejo.

Business value: 3

**9. Prikaz uporabljenih podatkov (Could have)**

Kot uporabnik želim videti, kateri podatki so bili uporabljeni za izračun cene, da bolje razumem rezultat.

- Glede na to, da sistem izračuna oceno vozila, ko prikaže rezultat, potem so prikazani tudi uporabljeni parametri vozila.

Business value: 3

**10. Uporaba javne zbirke podatkov (Must have)**

Kot razvijalec sistema želim uporabljati javno dostopno zbirko podatkov, da lahko zgradim model za napovedovanje cen avtomobilov.

- Glede na to, da imam dostop do javne zbirke podatkov, ko izvedem proces učenja modela, sistem ustvari model, ki omogoča napoved cene vozila na podlagi njegovih lastnosti.

Business value: 10

**11. Stabilno delovanje sistema (Must have)**

Kot uporabnik želim, da sistem deluje stabilno, da lahko vedno dobim oceno vrednosti vozila.

- Glede na to, da uporabnik pošlje zahtevo za oceno cene, ko sistem obdela zahtevo, vrne rezultat brez napake.

Business value: 9

**12. Čistost podatkov za učenje (Must have)**

Kot razvijalec sistema želim, da so podatki, ki bodo uporabljeni za učenje modela, čisti in urejeni, da lahko model pravilno treniram in dobim bolj natančne napovedi.

- Glede na to, da za učinkovito treniranje modela potrebujem kvalitetne podatke, ko izvedem postopek priprave podatkov, sistem odstrani nepravilne zapise ter ustvari očiščeno zbirko podatkov za učenje modela.

Business value: 9

**13. Izpis najbolj vplivnih dejavnikov za izračun cene (Could have)**

Kot uporabnik želim, da sistem izpiše, kateri dejavniki so najbolj vplivali na izračun cene izbranega vozila, da bolje razumem, zakaj je bila ocenjena določena vrednost.

- Glede na to, da sistem izračuna oceno cene vozila, ko prikaže rezultat, prikaže tudi seznam najpomembnejših dejavnikom (npr. letnik, kilometri, znamka), ki so vplivali na izračun cene.

Business value: 4

**14. Shranjevanje preteklih iskanj (Could have)**

Kot uporabnik želim imeti dostop do svojih preteklih iskanj ocen vozil, da lahko pregledam že izračunane ocene brez ponovnega vnosa podatkov.

- Glede na to, da sem že izvedel oceno vozila, ko odprem seznam preteklih iskanj, vidim seznam vozil, za katera sem že ocenil vrednost.

Business value: 3

**15. Primerjava med avtomobili (Could have)**

Kot uporabnik želim primerjati ocene cen več avtomobilov med seboj, da se lažje odločim za najboljšo možnost.

- Glede na to, da imam izračunane ocene za več vozil, ko izberem možnost primerjave, sistem prikaže ocene cen vozil skupaj na enem zaslonu za lažjo primerjavo.

Business value: 4

<br>

# 3 Cilji projekta

Glavna težava, ki jo projekt obravnava, je težko določanje realne tržne vrednosti rabljenega avtomobila na nemškem trgu. Posamezniki, ki želijo kupiti ali prodati vozilo, morajo trenutno sami primerjati veliko število oglasov na različnih spletnih straneh, kar je časovno zahtevno in pogosto vodi do netočne ocene vrednosti vozila.

Cilj projekta je razviti spletno aplikacijo, ki uporabniku omogoča, da z vnosom osnovnih podatkov o vozilu (npr. znamka, model, letnik, prevoženi kilometri) pridobi okvirno oceno tržne cene avtomobila na podlagi podatkov o rabljenih vozilih na nemškem trgu. Sistem bo uporabniku pomagal pri hitrejši in bolj informirani odločitvi pri nakupu ali prodaji vozila.

Koristi sistema za naročnika so predvsem prihranek časa, boljša informiranost ter bolj realna ocena vrednosti vozila. Uporabnik ne bo več potreboval ročnega pregledovanja številnih oglasov, saj bo sistem sam izračunal približno vrednost avtomobila. To izboljša uporabniško izkušnjo, saj omogoča hitro in enostavno pridobitev informacije, ki je pomembna pri sprejemanju odločitev.

Končni izdelki projekta bodo:

- spletna aplikacija za oceno vrednosti rabljenega vozila,

- model za napovedovanje cen vozil na podlagi podatkovnega seta,

- uporabniški vmesnik za vnos podatkov o vozilu,

- dokumentacija projekta.

Cilji projekta bodo merljivi in preverljivi z naslednjimi kriteriji:

- uporabnik lahko preko spletnega vmesnika vnese najmanj 4 ključne podatke o vozilu: znamko, model, letnik in število prevoženih kilometrov, ter uspešno odda zahtevo za oceno,

- sistem po oddaji zahtevka v razumljivem prikazu vrne ocenjeno tržno vrednost vozila,

- model za napovedovanje cen bo treniran na podatkovni zbirki z vsaj 10.000 oglasi rabljenih avtomobilov z nemškega trga,

- podatki za učenje modela bodo pred uporabo ustrezno očiščeni in pripravljeni,

- model bo na testnem naboru podatkov dosegal dovolj nizko povprečno napako napovedi, da bodo rezultati uporabni za okvirno oceno vrednosti vozila,

- sistem bo pri napačnih ali nepopolnih vnosih uporabnika ustrezno opozoril in ne bo izvedel napačnega izračuna,

- aplikacija bo omogočala več zaporednih poizvedb brez napak v delovanju,

- aplikacija bo pravilno delovala v vsaj dveh spletnih brskalnikih.

<br>

## 3.2 Merila uspeha

Ustreznost ideje smo preverili pri profesorju Dejanu Lavbiču. Njegovo mnenje nam je pomagalo oceniti, ali je takšna aplikacija koristna in ali rešuje dejanski problem pri določanju vrednosti vozila.

Kot zunanjega naročnika bomo obravnavali posameznika, ki želi kupiti ali prodati rabljeno vozilo na nemškem trgu. Tak uporabnik potrebuje hitro in zanesljivo informacijo o približni vrednosti avtomobila, da lahko primerja ponudbe in sprejme bolj informirano odločitev.

Uspešnost projekta bomo preverili tako, da bomo potencialnim uporabnikom omogočili uporabo razvite aplikacije in spremljali njihovo izkušnjo pri uporabi sistema. Če bodo uporabniki lahko enostavno vnesli podatke o vozilu in v kratkem času prejeli razumljivo oceno cene, bomo lahko sklepali, da je sistem dosegel svoj namen.

Pomembna merila uspeha za naročnika bodo:

- uporabnik bo lahko enostavno vnesel podatke o vozilu v spletni aplikaciji,

- sistem bo v kratkem času vrnil ocenjeno tržno vrednost vozila,

- rezultat bo predstavljen na jasen in razumljiv način,

- uporabniki bodo ocenili, da je ocena vrednosti vozila smiselna glede na trenutno stanje na trgu.

<br>

# 4 Opis sistema

Sistem bo spletna aplikacija, ki slovenskim uporabnikom omogoča oceniti tržno ceno rabljenega avtomobila na nemškem trgu.

Sistem bo ločen na več glavnih komponent: uporabniški vmesnik, zaledni strežnik, linearni regresijski model ter podatkovno zbirko. Uporabniški vmesnik bo skrbel za vnos podatkov in prikaz rezultatov, zaledni strežnik bo obdeloval uporabnikove zahteve in komuniciral z modelom za napovedovanje cene.

Linearni regresijski model bo naučen na javno dostopnih podatkih rabljenih avtomobilov iz nemškega trga. Na podlagi teh podatkov bo napovedal približno tržno vrednost vozila. Rezultat bo vrnjen strežniku, ki ga bo posredoval uporabniškemu vmesniku na katerem bo uporabniku prikazana predikcija cene vozila.

## 4.1 Blokovni diagram sistema

![Blokovni diagram](./gradivo/img/blokovni_diagram.svg)

## 4.2 Osrednji elementi sistema

### 4.2.1 Uporabniški vmesnik

Uporabniški vmesnik bo spletna aplikacija, preko katere bo uporabnik vnesel podatke o avtomobilu in prejel oceno njegove tržne vrednosti.

### 4.2.2 Zaledni strežnik

Strežnik bo obdeloval zahteve uporabnikov in komuniciral z naučenim modelom

backend bo obdeloval zahteve uporabnikov,

### 4.2.3 Linearni regresijski model (Naučen model)

Model bo naučen na podatkih o rabljenih avtomobilih iz nemškega trga. Njegova naloga bo napovedati tržno ceno avtomobila na podlagi lastnosti vozila, ki jih vnese uporabnik.

### 4.2.4 Podatkovna zbirka

Zbirka, ki vsebuje podatke o rabljenih avtomobilih prodajanih v Nemčiji.

<br>

# 5 Predlagan pristop

Pri projektu bomo sledili postopnemu razvoju sistema. Najprej bomo pripravili in očistili podatkovni set rabljenih avtomobilov iz nemškega trga, nato bomo izdelali model za napovedovanje cen, na koncu pa ga bomo povezali v spletno aplikacijo. Sistem bo deloval tako, da bo uporabnik v spletni obrazec vnesel podatke o vozilu, na primer znamko, model, letnik in število prevoženih kilometrov. Ti podatki se bodo poslali zalednemu strežniku, ki jih bo obdelal in posredoval naučenemu modelu. Model bo izračunal okvirno vrednost vozila, rezultat pa bo prikazan v uporabniškem vmesniku. Po možnosti bo aplikacija poleg ocenjene cene prikazala tudi cenovni razpon.

Za razvoj bomo uporabljali osnovne spletne tehnologije za uporabniški vmesnik, Python za zaledni del in razvoj modela ter knjižnice za delo s podatki in strojnim učenjem, kot so pandas, NumPy in scikit-learn. Za razvoj in urejanje kode bomo uporabljali Visual Studio Code, za skupinsko delo in verzioniranje pa GitHub. Ta orodja so primerna, ker podpirajo glavne komponente sistema: uporabniški vmesnik, backend, model in podatkovno zbirko. Sistem bomo testirali na več ravneh. Najprej bomo preverili kakovost in ustreznost podatkov za učenje modela. Nato bomo testirali model na ločenem delu podatkov, da ocenimo, kako dobro napoveduje cene. Poleg tega bomo izvedli funkcionalno testiranje aplikacije, kjer bomo preverili pravilnost vnosa, prikaz rezultatov in odziv sistema. Preverili bomo tudi povezavo med uporabniškim vmesnikom, zalednim strežnikom in modelom ter osnovno uporabniško izkušnjo pri uporabi aplikacije. Ustreznost strategije testiranja bomo ovrednotili glede na to, ali z njo pokrijemo vse ključne dele sistema. Strategija bo ustrezna, če bomo z njo lahko preverili kakovost podatkov, pravilnost delovanja modela, stabilnost sistema in razumljivost prikazanega rezultata za uporabnika. Uspešna bo, če bo sistem omogočal enostaven vnos podatkov, v kratkem času vrnil oceno cene in deloval brez napak pri več zaporednih poizvedbah.

<br>

# 6 Vodenje projekta

Za spremljanje sprememb funkcionalnosti projekta bomo vodili dnevnik sprememb (angl. change log). Vsaka sprememba bo zabeležena v tabeli z naslednjimi atributi: datum, opis spremembe, motivacija, posledica spremembe. Ker v prvi iteraciji še ne bomo implementirali nobene funkcionalnosti, trenutno v dnevniku sprememb ni nobenih vnosov.

Pri izvajanju projekta bomo uporabljali razvojni proces Scrum, ki omogoča iterativno izvajanje projekta. Določili smo naslednje ključne elemente procesa:

- Delo bo potekalo v sprintih, znotraj katerih bomo določili cilje, ki naj bi jih dosegli v tem obdobju.
- Na začetku vsakega sprinta bomo izvedli načrtovanje sprinta, kjer bomo iz product backloga izbrali cilje, ki jih bomo implementirali v tem sprintu.
- Po vsakem sprintu bomo imeli pogovor z naročnikom (profesor in asistenta), ki nam bo služil kot povratna informacija o našem delu. To nam bo pomagalo pri pregledu in retrospektivi sprintov.
- Pregledi sprintov bodo potekali po vsakem sprintu. Tako bomo lahko preverili ali so bili doseženi vsi cilji in ali moramo prilagoditi izvajanje projekta.
- Retrospektiva sprinta bo prav tako potekala po vsakem sprintu. Cilj retrospektive bo, da se posvetujemo o načinu izvajanja projekta v preteklem sprintu in ugotovimo kaj smo izvedli dobro in kaj bi lahko izboljšali. Prav tako bomo preverili, če smo uspešno upoštevali popravke, ki smo jih določili pri prejšnji retrospektivi.
- Ekipa bo imela vsak teden en sestanek v živo ter en spletni sestanek preko MS Teams.
- Komunikacija med člani ekipe bo potekala preko MS Teams. Enako velja za komunikacijo z naročnikom. Za upravljanje kode bomo uporabljali GitHub.

Osredotočeni bomo na minimalni delujoč sistem (MVP), osnovno delujočo različico sistema, ki bo omogočala oceno tržne vrednosti rabljenega vozila na podlagi vnosa njegovih osnovnih lastnosti. Sistem bo vključeval preprost uporabniški vmesnik, preko katerega bo uporabnik lahko vnesel podatke o vozilu, kot so znamka, model, letnik in število prevoženih kilometrov. Regresijski model bo na podlagi pripravljenega in očiščenega podatkovnega seta izračunal ocenjeno vrednost vozila, rezultat pa bo prikazan uporabniku. MVP bo prav tako zagotavljal osnovno preverjanje pravilnosti vnosa ter stabilno delovanje sistema, ki bo omogočalo več zaporednih izračunov brez napak.

## 6.1 Usklajevanje ekipe

Delo bo razporejeno med člane ekipe glede na njihova znanja in interese, pri čemer bomo stremeli k enakomerni porazdelitvi nalog.

Scrum Master – Zoja Jakopin – bo skrbela za izvajanje Scrum procesa in za učinkovito sodelovanje ekipe. Ostali člani skupine bodo imeli vlogo razvijalca.

Kot ekipa se bomo sestajali dvakrat tedensko. Ob četrtkih bomo imeli sestanke v živo, kjer bomo načrtovali dejavnosti v sledečem tednu. Ob torkih bomo imeli sestanke preko MS Teams, kjer bodo člani lahko izpostavili težave na katere so naleteli. Skupaj bomo poskrbeli, da se težave odpravijo in se izvajanje projekta nadaljuje po načrtih. Po potrebi bomo organizirali dodatne sestanke preko MS Teams, kadar bo potrebno dodatno načrtovanje.

Namen sestankov je pregled opravljenega dela ter razprava o morebitnih težavah pri izvajanju projekta.

## 6.2 Projektni načrt

Seznam aktivnosti:

| Oznaka aktivnosti | Naziv aktivnosti | Predviden začetek izvajanja | Predviden konec izvajanja | Trajanje (dnevi) | Napor v ŠČD | Odvisnosti | Kritična pot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | Upravljanje projekta | 23.02.2026 | 22.05. 2026 | 62 | 20 | / | NE |
| A2 | Izbira ideje projekta | 23.02.2026 | 27.02.2026 | 5 | 5 | / | DA |
| A3 | Določitev zahtev | 2.03.2026 | 4.03.2026 | 3 | 5 | A2 | DA |
| A4 | Določitev vlog znotraj ekipe | 2.03.2026 | 2.03.2026 | 1 | 2 | A2 | NE |
| A5 | Določitev ciljev, opisa sistema, predlaganega pristopa | 5.03.2026 | 11.03.2026 | 5 | 6 | A3 | NE |
| A6 | Izdelava projektnega in finančnega načrta | 5.03.2026 | 12.03.2026 | 6 | 6 | A3 | DA |
| A7 | Identifikacija tveganj, določanje strategij za obvladovanje tveganj | 5.03.2026 | 11.03.2026 | 5 | 4 | A3 | NE |
| A8 | Revizija predloga projekta | 13.03. 2026 | 13.03. 2026 | 1 | 4 | A4, A5, A6, A7 | DA |
| A9 | Oddaja predloga projekta | 16.03.2026 | 16.03.2026 | 1 | 2 | A8 | DA |
| A10 | Izvajanje 2. iteracije | 17.03.2026 | 6.04.2026 | 14 | 80 | A9 | DA |
| A11 | Izvajanje 3. iteracije | 7.04.2026 | 4.05.2026 | 18 | 100 | A10 | DA |
| A12 | Izvajanje 4. iteracije | 5.05.2026 | 22.05.2026 | 14 | 70 | A11 | DA |

<br>
<br>
Razdelitev aktivnosti iz prve iteracije:
<br><br>

| Oznaka aktivnosti | Naziv aktivnosti | Lian (%) | Živa (%) | Niko (%) | Zoja (%) | Miha (%) |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | Upravljanje projekta | 15% | 15% | 15% | 40% | 15% |
| A2 | Izbira ideje projekta | 20% | 20% | 20% | 20% | 20% |
| A3 | Določitev zahtev | 40% | 15% | 15% | 15% | 15% |
| A4 | Določitev vlog znotraj ekipe | 20% | 20% | 20% | 20% | 20% |
| A5 | Določitev ciljev, opisa sistema, predlaganega pristopa | 30% | 10% | 40% | 10% | 10% |
| A6 | Izdelava projektnega in finančnega načrta | 10% | 10% | 10% | 10% | 60% |
| A7 | Identifikacija tveganj, določanje strategij za obvladovanje tveganj | 10% | 10% | 10% | 40% | 30% |
| A8 | Revizija predloga projekta | 20% | 20% | 20% | 20% | 20% |
| A9 | Oddaja predloga projekta | 20% | 20% | 20% | 20% | 20% |

<br>
<br>
Seznam izdelkov:
<br><br>

| Oznaka izdelka | Ime izdelka | Aktivnost v okviru katere je izdelek končan | Datum izdaje izdelka |
| --- | --- | --- | --- |
| I1 | Predlog projekta | A9 | 16.03.2026 |
| I2 | Osnutek arhitekture sistema | A10 | 06.04.2026 |
| I3 | Očiščena podatkovna baza | A10 | 06.04.2026 |
| I4 | Testni uporabniški vmesnik za vnos podatkov o vozilu | A10 | 06.04.2026 |
| I5 | Model za napovedovanje cen vozil | A11 | 04.05.2026 |
| I6 | Delujoč prototip sistema | A11 | 04.05.2026 |
| I7 | Končna različica spletne strani | A12 | 22.05.2026 |
| I8 | Končno poročilo projekta | A12 | 22.05.2026 |

<br>
<br>


![Ganttov diagram](https://vip.lavbic.net/plantuml/png/hLRBRjim4BppAnR9rQfj-T6UYY0e41XeqI11JqOEQtCZKwP9WQG4n3_Ga__A7rPAhX175kq8oKdIQZcStPsXT6CT6fUWSWwkxigBBe0BJ0nkhbXcX79sYPA0ev0lm2owt71yiO26O2cr9SvihfgXU11F-uDnVp05OPl1-Ej9SD8V38-24bMIOq9W9MFitkYKbWuUIwuMoXNH88xY4MFpFvd1GgQeKeAip5ixV0A9rYTEOpZmKhp2rb8RyhSAVeeDtHaYnLWKmV0B24S6bo95Y2AFEjikX44Gd5fW9s7KPELkPKvi_iD7zpkFMi0ML_vIBnvrMrn8dS1MQMSm1LgBZ6gWOJUWfP0f5JtGcR08LbX76-pvseXBzFEd1Fs33-kiKw6pBIU91TPTge1yohDGgFQxwb7XVcUEnl8UM4xAYMUnFWp55Hv7fJtWPKL_gsbRtnD7YKXzXq4l2ebS5zMR_zbTodYWGcpBdQg6w0HFflwUVl_c73-84HPVDB_ssRs5blmf-Wuj4cEjkclaTXB26JPlKLjq6c3JgAABViBrVOfSs0SCKv8uew6BdhwulfFFcaq-Z_mfLhkqpNcBDGa7ZLITrt7BULqGN-3nczU3SXnotQCZaWVNdR7kgM9RzgfuZOAyHcsyleLu_I8kyirzRZ99mU92j4OdjCP1MkDExPef_sEW7lpdELHOYDFuBQUwsMjTA_UrsolCCbBrHtuInPCGtO1cMa0Pko75gv-SVm00 "Ganttov diagram")<br>
**Ganttov diagram** (izvorna koda :bar_chart: [PlantUML](./gradivo/plantuml/GanttChart.puml))

<br><br>

![PERT diagram](https://vip.lavbic.net/plantuml/png/jPI_ReCm4CPtFyKfsQgqnVmn9esGMF84tT8C54oAGg0YhjGX3ryRsoX6HX53XuJZk_FtumxZXbKSU0TzVVhYKDOzAtZTjGXTYxnXuBrG4PxhzZllymkKhCf_6lxEVddMrAVsmbeEXVXZlIZZEMUmol0AyYja6DPxka_s2MnXfyEDlgOt0EB33Jpnay57AvJXpYZ6RbTqJTTloxm_zwnCCt_tEYYfelYmhYf667bhwfQPiW6fz8s-IYH46X1DYT4yCB21mI9WeBo1tWErC0uiLCxXWu41rck9CHCcW2K2XtTsaRAB7jdfnnWSb9y491ExwJY8FGwoQ1p48CFxUT1f1x7oZl-d0sftG1TrWBKvO6iFZT8SDB6XoNAeR1OJ2sgaEIZsR2hsbc1LJ_AL1Pw5DT8i5a-mU16MQdi8hQzcb6QnawC1-ukxbVQJysYK44A7foCyFwV2MeM7jVRSV7PDUPGP7uaZoPK8a7mWHqOu3MjaKOZ4-J94qH0vVCXO4YDnP0mHHU9hDn5nBXE9U2oXpf84YMtfIc0FoQtZJ64aNwypvOk9_G40 "PERT diagram")<br>
**Graf PERT** (izvorna koda :bar_chart: [PlantUML](./gradivo/plantuml/PertChart.puml))

<br>

## 6.3 Finančni načrt

Za izračun časovne zahtevnosti projekta smo uporabili metodo COCOMO II. Metoda za oceno časovne zahtevnosti projekta uporabi formulo:

Napor = A * obseg ^ B * M

Za parameter A vzamemo privzeto vrednost 2.94 ostale parametre pa je potrebno izračunati.

Seznam funkcionalnosti:

| Funkcionalnost | Vrsta funkcionalnosti | Obseg | Utež |
| --- | --- | --- | --- |
| Vnos in oddaja podatkov o avtomobilu | EI | Average | 4 |
| Preverjanje pravilnosti podatkov o avtomobilu | EI | Low | 3 |
| Prikaz napovedane cene avtomobila | EO | Average | 5 |
| Prikaz cenovnega razpona avtomobila | EO | Low | 4 |
| Prikaz ključnih dejavnikov, ki vplivajo na ceno | EQ | Low | 3 |
| Primerjava več vozil | EQ | Average | 4 |
| Shranjevanje ocenjenih vozil | ILF | Low | 7 |
| Pregled zgodovine ocenjenih vozil | EO | Low | 4 |
| Interna očiščena podatkovna baza za učenje modela | ILF | Low | 7 |
| Zunanja javna podatkovna baza | EIF | Low | 5 |
|  |  | Vsota: | 46 |

Če uteži seštejemo dobimo 46. To število moramo pomnožiti z ocenjenim številom vrstic za posamezno funkcionalnost. Ker bomo uporabljali različne programske jezike za različne funkcionalnosti je treba upoštevati različna števila potrebnih vrstic.

Kot vir za povprečno število vrstic smo uporabili spletno stran: https://www.qsm.com/resources/function-point-languages-table

Za razvoj bomo večinoma uporabljali JavaScript in Python. Python žal ni vključen v QSM tabeli, zato smo izračun prilagodili.

15 * 50 + 31 * 47 = 2207 SLOC = 2.207 KSLOC

Izračun parametra B:

| Dejavnik | Opis | Vrednost | Utež |
| --- | --- | --- | --- |
| PREC | Stopnja precedenčnosti | Nizka | 4 |
| FLEX | Stopnja fleksibilnosti zahtev | Nominalna | 3 |
| RESL | Stopnja pripravljenosti na tveganja | Visoka | 2 |
| TEAM | Stopnja uigranosti ekipe | Nizka | 4 |
| PMAT | Zrelostni nivo razvojnega procesa po modelu CMM | Zelo nizka | 5 |
|  |  | Vsota: | 18 |

Parameter PMAT smo določili na podlagi modela CMM, ki je na voljo na tej povezavi, na strani 23:

https://www.cs.montana.edu/courses/spring2004/352/public/cocomo/modelman.pdf

Parameter B lahko izračunamo po formuli:

B = 1.01 + 0.01 * sum w_i = 1.01 + 0.01 * 18 = 1.19

Izračun parametra M:

| Dejavnik | Opis | Ocena | Razpon uteži | Utež |
| --- | --- | --- | --- | --- |
| PERS | Usposobljenost skupine | Nominalna | 1.5 - 0-5 | 1 |
| PREX | Izkušnje članov z uporabljeno tehnologijo | Nominalna | 1.5 - 0.5 | 1 |
| RCPX | Kompleksnost in zanesljivost projekta | Visoka | 0.5 - 1.5 | 1.2 |
| RUSE | Razvoj komponent za ponovno uporabo | Nizka | 0.5 - 1.5 | 0.7 |
| PDIF | Težavnost platforme | Nominalna | 0.5 - 1.5 | 1 |
| SCED | Časovna omejitev | * | * | 1 |
| FCIL | Naprednost orodij in komunikacijskih sredstev | Nizka | 1.5 - 0.5 | 1.2 |
|  |  |  | Zmnožek: | 1.008 |

*Parameter SCED ima privzeto vrednost 1.

M = PERS * PREX * RCPX * RUSE * PDIF * SCED * FCIL = 1.008

Izračunane vrednosti vstavimo v formulo: Napor = A * obseg ^ B * M = 2.94 * 2.207^(1.19) * 1.008 = 7.602

Izračun po metodi COCOMO ll oceni, da bo časovna zahtevnost projekta 7.602 človek mesecev(ČM). En ČM je enak 20 človek dni(ČD), torej 7.602 * 20 = 152 ČD. ČD predstavlja 8 ur napora na dan, vendar bomo pri našem projektu upoštevali enoto študentski človek dan (ŠČD), ki predstavlja 4 ure napora na dan. Izračunamo lahko torej napor v ŠČD:

152 ČD * 8h/4h = 304 ŠČD

Če postavimo urno postavko 20€/h dobimo ceno dela: 304 * 4 * 20 = 24320€

| Postavka | Izračun | Znesek |
| --- | --- | --- |
| Strošek dela | 304 × 4 × 20 | 24.320 EUR |
| Elektrika | / | 200 EUR |
| Internet | / | 100 EUR |
| Potni stroški | / | 300 EUR |
| Programska oprema in razvojna orodja | / | 150 EUR |
| Skupaj | 24.320 + 750 | 25.070 EUR |

<br>

# 7 Ekipa

## 7.1 Predznanje

Ekipo sestavlja 5 študentov Fakultete za računalništvo in informatiko, ki bodo skupaj prvič sodelovali na projektu. Naša ekipa ima predznanje iz različnih področji računalništva, ki smo jih pridobili tekom študija na FRI.

## 7.2 Vloge

| Član | Vloga | Opis |
| --- | --- | --- |
| Zoja Jakopin | Scrum master | Študentka Fakultete za računalništvo in informatiko z osnovnim znanjem HTML, CSS, JavaScript in SQL. Skrbi za pravilno izvajanje Scrum metodologije in za učinkovito delo razvojne ekipe. Organizira ključne Scrum aktivnosti, kot so Sprint Planning, Sprint Review in retrospektiva. Poleg tega odstranjuje ovire, ki bi lahko vplivale na napredek ekipe. Preostali čas bo pomagala pomagala bo tudi pri razvoju uporabniškega vmesnika na frontend delu aplikacije. |
| Miha Janežič | Razvijalec | Študent Fakultete za računalništvo in informatiko Univerze v Ljubljani z znanjem HTML, CSS, JavaScript in SQL. Pri projektu bo sodeloval predvsem pri razvoju uporabniškega vmesnika (frontend) ter skrbel za implementacijo in izboljšanje uporabniške izkušnje. Znanje želi dodatno poglobiti skozi praktično delo na projektu, po potrebi pa lahko pomaga tudi pri drugih delih sistema na podlagi znanja, pridobljenega med študijem. Bo pomagal Scrum masterju pri vodenju projekta. |
| Živa Lavrič | Razvijalec | Študentka Fakultete za računalništvo in informatiko Univerze v Ljubljani, ima znanje s področja razvoja strežniškega dela aplikacij in obdelave podatkov v ozadju. Razume delovanje zalednih sistemov, povezovanje med uporabniškim vmesnikom in podatkovnim delom ter skrbi za pravilno izvajanje logike aplikacije. Pri projektnem delu prispeva predvsem k razvoju strežniškega dela sistema, obdelavi uporabniških zahtevkov in povezavi med spletno aplikacijo ter modelom za napovedovanje cen. |
| Lian Arl | Razvijalec | Študent Fakultete za računalništvo in informatiko Univerze v Ljubljani z znanjem HTML, CSS, JavaScript in SQL. Pri projektu bo sodeloval predvsem pri pridobivanju podatkov in razvoju linearnega regresivnega modela. Znanje želi dodatno poglobiti skozi praktično delo na projektu, po potrebi pa lahko pomaga tudi pri drugih delih sistema na podlagi znanja, pridobljenega med študijem. |
| Niko Kralj | Razvijalec | Študent Fakultete za računalništvo in informatiko Univerze v Ljubljani z znanjem C, C++, HTML, CSS, JavaScript in React. Zna oblikovati pregledne, funkcionalne in uporabniku prijazne rešitve. Pri projektnem delu prispeva predvsem k načrtovanju in izdelavi spletnega vmesnika ter skrbi, da je aplikacija vizualno urejena, odzivna in enostavna za uporabo. Pomagal bo pri razvoju regresijskega modela ter razvijanju frontenda in povezovanju z backendom. |

<br>

# 8 Omejitve in tveganja

## 8.1 Omejitve

Pri projektu obstajajo predvsem etične in pravne omejitve. Sistem bo podajal le okvirno oceno vrednosti vozila, zato mora biti jasno, da ne gre za uradno cenitev. Uporabljali bomo javno dostopne podatke in pazili, da ne bomo kršili pogojev njihove uporabe.

Glavna tveganja so slaba kakovost podatkov, manjša natančnost modela, časovne zamude in neenakomerna porazdelitev dela v ekipi. Ta tveganja bomo obvladovali s čiščenjem podatkov, sprotnim testiranjem, jasno delitvijo nalog in rednim spremljanjem napredka.

Ocenjujemo, da bomo imeli dostop do potrebnih podatkov, storitev in virov, saj bomo uporabljali javno dostopne podatkovne zbirke, standardna razvojna orodja in prosto dostopne knjižnice. Možna omejitev je predvsem kakovost oziroma obseg podatkov.

Dodatno bomo potrebovali predvsem dobro usklajevanje ekipe, dovolj časa za pripravo podatkov ter po potrebi usmeritve profesorja.

## 8.2. Identifikacija in analiza tveganj

| Tveganje | Vrsta tveganja | Opis tveganja | Vpliv na | Verjetnost | Učinek/ posledice |
| --- | --- | --- | --- | --- | --- |
| T1 Odhod člana ekipe | Ljudje | Eden od članov zapusti ekipo. | Projekt | Nizka | Znosen |
| T2 Bolezen | Ljudje | Člani zbolijo in niso na voljo | Projekt in posel | Zmerna | Zanemarljiv |
| T3 Podcenjevanje časa | Ocenjevanje | Čas za razvoj projekta je podcenjen glede na obsežnost projekta. | Izdelek | Visoka | Katastrofalen |
| T4 Čiščenje podatkov | Ocenjevanje | Podcenjevanje časa in kompleksnosti čiščenja podatkov | Projekt | Visoka | Resen |
| T5 Pomanjkanje podatkov | Tehnologija | Javna zbirka podatkov nima dovolj zapisov za zanesljivo treniranje modela | Izdelek | Zmerna | Znosen |
| T6 Slaba kakovost podatkov | Tehnologija | Podatki vsebujejo napačne ali manjkajoče vrednosti o avtomobilih | Izdelek | Zelo visoka | Resne |
| T7 Cene v podatkovni bazi niso več aktualne | Tehnologija | Če podatki niso dovolj aktualni lahko napovedujemo nerealne cene avtomobilov | Izdelek in projekt | Visoka | Katastrofalen |
| T8 Slaba napoved za redka vozila | Tehnologija | Premalo podatkov za redka vozil (npr. luksuzna in električna) vozila za zanesljivo napoved | Izdelek | Zmerna | Znosen |
| T9 Neenakomerna porazdelitev dela | Organizacija | Nekateri člani imajo preveč nalog | Projekt | Zmerna | Nepomemben |
| T10 Sprememba prioritet med razvojem | Organizacija | Med razvojem pride do spremembe v prioriteti glede razvoja funkcionalnosti in nalog. | Projekt in izdelek | Zmerna | Znosen |
| T11 Slaba uporabniška izkušnja | Zahteve | Nejasen uporabniški vmesnik | Izdelek | Nizka | Resne |
| T12 Nejasnost pri definiranju zahtev | Zahteve | Slabo definirane zahteve, lahko pripeljejo do razvoja nepotrebnih funkcionalnosti. | Izdelek | Zmerna | Znosen |
| T13 Slaba povezava med tehnološkimi okolji | Orodja | Slaba integracija med med Python modelom in stackom povzroči nepravilno ustvarjanje napovedi. | Izdelek | Zmerna | Resen |
| T14 Neusklajena razvojna okolja | Orodja | Različne verzije razvojnih okolji lahko povzročajo težave pri razvoju | Projekt | Zmerna | Resen |
| T15 Težave z razvojnim okoljem | Orodja | Vsem članom ekipe ni na voljo razvojno okolje za izvajanje projekta. | Projekt | Zmerna | Resen |

<br>

## 8.3. Matrika izpostavljenosti tveganj

Matrika izpostavljenosti tveganj je orodje za ocenjevanje tveganj glede na parametra učinek in verjetnost. Omogoča nam da lažje določimo katera tveganja so bolj pomembna in katera manj ter katera zahtevajo več pozornosti. Vrstice v matriki predstavljajo verjetnosti tveganj, stolpci pa učinke. Končno stopnjo tveganj dobimo na presečišču obeh dejavnikov.

| Verjetnost/Učinek | Zanemarljiv | Nepomemben | Znosen | Resen | Katastrofalen |
| --- | --- | --- | --- | --- | --- |
| Zelo visoka | Srednje Nizka | Srednja | Srednje visoka | Visoka | Visoka |
| Visoka | Nizka | Srednje Nizka | Srednja | Srednje visoka | Visoka |
| Zmerna | Nizka | Srednje Nizka | Srednja | Srednje visoka | Srednje visoka |
| Nizka | Nizka | Srednje Nizka | Srednje Nizka | Srednja | Srednje visoka |
| Zelo nizka | Nizka | Nizka | Srednje Nizka | Srednja | Srednja |

V matriki so tveganja razvrščena na pet ravni v naslednjem vrstnem redu: nizka, srednje nizka, srednja, srednje visoka in visoka. Nižje razvrščena tveganja potrebujejo od nas manj pozornosti kot višje razvrščena, ki potrebujejo takojšne ukrepanje.

<br>

## 8.4. Načrt obvladovanje tveganj

Pri obvladovanju tveganj smo uporabili tri različne strategije. Strategijo izogibanja uporabimo kadar lahko s pravočasnimi ukrepi zmanjšamo verjetnost, da se bo tveganje uresničilo. Strategijo zmanjševanja uporabimo pri tveganjih, ki jih v celoti ne moremo preprečiti, lahko pa zmanjšamo njihov vpliv na projekt. Krizni načrt uporabimo pri tveganjih, ki opredeljujejo nepredvidljive dogodke.

| Tveganja | Opis strategije | Strategija | Stopnja tveganja |
| --- | --- | --- | --- |
| T3 Podcenjevanje časa | Projekt razdelimo na več faz ter določimo realne roke z nekaj časovne rezerve. Hkrati delo razporedimo med člane, ki imajo z določenimi deli projekta že izkušnje. | Strategija izogibanja | Visoka |
| T7 Cene v podatkovni bazi niso več aktualne | Pred uporabo podatkovne baze preverimo aktualnost le te. Uporabniku ob izračunu tudi prikažemo obvestilo, da je cena le informativna. | Strategija zmanjševanja | Visoka |
| T6 Slaba kakovost podatkov | Pred uporabo podatkov izvedemo čiščenje podatkov, odstranimo napačne zapise ter uredimo manjkajoče vrednosti. | Strategija zmanjševanja | Visoka |
| T4 Čiščenje podatkov | Že na začetku projekta določimo postopek čiščenja baze in se izogibamo bazi z veliko manjkajočimi podatki. | Strategija izogibanja | Srednje visoka |
| T13 Slaba povezava med tehnološkimi okolji | V zgodnjih fazah projekta vzpostavimo enostaven prototip povezave in testiramo komunikacijo med različnimi deli sistema. | Strategija izogibanja | Srednje visoka |
| T14 Neusklajena razvojna okolja | Ekipa pred začetkom ustvari navodila za nastavitve razvojnega okolja in preveri ali uporablja enako verzijo orodji, knjižnic itd. | Strategija izogibanja | Srednje visoka |
| T15 Težave z razvojnim okoljem | Pred začetkom izvajanja projekta poskrbimo, da je razvojno okolje na voljo vsem članom. | Krizni načrt | Srednje visoka |
| T12 Nejasnost pri definiranju zahtev | Zahteve natančno in jasno opredelimo že na začetku projekta. | Strategija izogibanja | Srednja |
| T5 Pomanjkanje podatkov | Že zgodaj preverimo obseg podatkov in po potrebi zmanjšamo obseg podprtih vozil. | Strategija zmanjševanja | Srednja |
| T8 Slaba napoved za redka vozila | Če za določena vozila ni dovolj podatkov, sistem omejimo na vozila, za katera imamo dovolj primerov. | Strategija zmanjševanja | Srednja |
| T10 Sprememba prioritet med razvojem | Če se prioritete spremenijo, jih ekipa upošteva ob načrtovanju naslednjega sprinta. | Strategija zmanjševanja | Srednja |
| T11 Slaba uporabniška izkušnja | Med razvojem testiramo uporabniški vmesnik pri strankah ter po potrebi poenostavimo obrazce za izpolnjevanje in prikaz rezultatov. | Strategija zmanjševanja | Srednja |
| T1 Odhod člana ekipe | Ob odhodu člana delo razdelimo med ostale člane ekipe. Zmanjšamo lahko tudi število funkcionalnosti, ki jih bomo implementirali. | Krizni načrt | Srednje nizka |
| T9 Neenakomerna porazdelitev dela | Čez celoten potek projekta spremljamo obremenjenost vsakega člana ekipe in pravočasno prerazporedimo delo ostalim članom. | Strategija zmanjševanja | Srednje nizka |
| T2 Bolezen | Če član zboli in ni na voljo njegovo delo razporedimo med ostale člane in dokumentiramo pomembne informacije za čas njegove vrnitve. | Krizni načrt | Nizka |