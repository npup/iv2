# instrumentverkstan.se

Statiskt byggd hemsida.

## Förutsättningar

Ladda ner och installera följande helt kostnadsfria program på din dator:

- [nodejs](https://nodejs.org/en) (version 20 eller högre)
- git, t.ex. [git for Windows](https://git-scm.com/download/win).
- [VS Code](https://code.visualstudio.com/download)

Checka sedan ut denna kod med `git`, bygg projektet med `nodejs` och redigera till du är nöjd.

För att sedan publicera på riktiga Internet:

1. Pusha ändringar till github
2. Kör publiceringsscriptet från din dator

## Ladda ner kod

Klona till lokal maskin och initialisera:

    git clone <repo>
    cd instrumentverkstan.se
    npm i

## Bygg för produktion

Starta generering:

    npm run build

Webbplats genereras till directoryt `./build`.  Den kan laddas upp till valfri hosting.

## Lokal utveckling

Starta lokal server för utveckling:

    npm start

Server kommer att starta på [http://localhost:3001/](http://localhost:3001/)

Öppna koden i en editor och gör önskade ändringar.  Committa dem därefter med en
informativ kommentar:

    git add .
    git commit -m 'Förbättringar av xyz'

### Ändra innehåll

#### Var finns innehållet?

Sidornas textinnehåll redigeras i filerna som ligger i

    src/content/pages

Där finns (utökade) markdownfiler (`.mdx`) för alla huvudsidor:

- `/butik/index.mdx`
- `/butik/sålt/index.mdx`
- `/hitta-hit/index.mdx`
- `/home/index.mdx` (roten)
- `/kontakt/index.mdx`
- `/service/index.mdx`

Varje sida har sitt eget directory, där till sidan relaterade resurser är tänkta att
ligga (om sådana finns):

- `/butik/images/...`
- `/service/images/...`

Läs här om hur man redigerar markdown: [https://www.markdownguide.org/basic-syntax/](https://www.markdownguide.org/basic-syntax/).

Instrumenten är en egen uppsättning innehåll, läs mer om dem nedan

#### Adress, telefon, kart-URLar osv.

En del data används på många ställen och finns därför konfigurerad på ett ställe:

    src/content/site-data.json

Där kan man uppdatera t.ex. mail, telefonnummer, sitens namn, besöks- och postadresser
samt URLar till tre olika googlemaps (nämligen de som avser besöksadressen,
postadressen och "hitta hit"-kartan).

#### Instrument

Instrument till försäljning/tidigare sålda instrument är har en egen mekanism.
I directoryt `src/content/instruments` ligger filer, vilka var och en motsvarar ett
instrument som kan komma att förekomma på siten.

Bilderna som hör till dessa instrument skall ligga i directoryt
`src/content/instruments/images` (se nedan).

Både filens namn och dess innehåll spelar roll:

**Namnet**

Namnet skall vara uppbyggt av två delar, och
följa detta mönster:

    00042_conn10m-1938-utsökt.md

1. Det femställiga numret i början av filnamnet (`00042`) är till för att filerna skall visas i rätt (tillagd-) ordning i kodrepositoryt.  Nya filer ges ett namn som tar nästa lediga nummer i serien.
2. Därpå följer en separator: `_`.  Använd **inte** detta tecken på annat ställe i filnamnet!
3. Nästa del av filnamnet (`conn10m-1938-utsökt`) skall vara något kort och fint som passar att synas i en URL (när man länkar) till sidor för dessa föremål.
4. Filnamnet avslutas med `.md`, ty det är en markdownfil.

**Innehållet**

Innehållet har följande delar (exempel):

    name: Conn 10M 1938
    descrShort: ypperligt skick
    descrLong: Endast två tidigare ägare.  Flitigt spelad, men utan bucklor och endast minimalt med skav på klockstycket (se bilder).  Det följer med en extra nacke och ett bra case.
    price: 25000
    images:
        - [ conn10m-38.jpg, "En snygg sax" ]
        - [ conn10m-38-2.jpg, "Snygga saxen igen" ]
        - [ conn10m-38-3.jpg, "Insidan av snygga saxen" ]
    sold: false
    noLink: false
    hidden: false

**Beskrivning av fälten:**

#### name

Detta är det enda fält man egentligen behöver ange.

#### descrShort

Behöver ej anges, default är tom sträng.  
I det fall `descrShort` är definierat visas texten invid namnet i länkar och rubriker.

#### descrLong

Behöver ej anges, default är tom sträng.  
I det fall `descrLong` är definierat visas texten på instrumentets egen sida.

#### price

Behöver ej anges.  
I det fall `price` är definierat visas det på listningssidan och på instrumentets egen sida.

#### images

Behöver ej anges, default är tom lista av bilder.  
Bilderna, anges som en lista av `[ filnamn, hovertext ]`, namn som syftar på bilder som skall
ligga i `src/content/instruments/images`.  Man kan för närvarande använda `.jpg`, `.png` och
`.gif`-filer.  Ev. bilder visas på instrumentets egen länkade sida.

#### sold

Behöver ej anges, default `false`.  
Vid `false` antas instrumentet vara "till försäljning", och listas som så.  När ett
instrument sålts skriver man dit datum, t.ex. `2023-04-01`, varvid instrumentet hamnar
i "tidigare sålda" istället.  Man kan även ange `true`, om man inte kan eller vill ange
datum.

#### noLink

Behöver ej anges, default: `false`.  
I de fall man inte vill skapa en egen länkad sida för ett visst instrument kan man ange
`noLink: true`. Instrumentet listas  fortfarande (till salu eller tidigare sålt enl. ovan),
men får ingen länk till egen sida som man kan gå till.

#### hidden

Behöver ej anges, default `false`.  
Vill man dölja ett objekt helt och hållet kan man sätta `hidden: true`. Då visas inte
instrumentet någonstans.
