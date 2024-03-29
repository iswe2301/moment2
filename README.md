# DT208G - Programmmering med TypeScript

## Moment 2 - projektbeskrivning
Projektet går ut på att skapa en "att göra"-applikation där användaren kan lägga till nya uppgifter (todos), markera dem som klara och visa en lista över sina todos. Applikationen kommer att skapas med TypeScript och använda principer för objektorienterad programmering (OOP) samt lokal lagring. Projektet är en del av kursen DT208G Programmering i TypeScript vid Webbutvecklingsprogrammet, Mittuniversitetet.

## Lösning
Webbsidan "Task Manager" är en webbapplikation som tillåter användare att skapa "att göra-uppgifter", visa uppgifter, markera uppgifter som klara samt ta bort befintliga uppgifter. Varje uppgift kan prioriteras med tre olika nivåer (hög, medel, låg) och baserat på prioritet visas uppgifterna i olika ordning i tabellen (högst prio överst). Applikationen använder LocalStorage för att spara uppgifterna, så att användaren kan komma tillbaka till sin lista även efter att webbläsaren stängts ner.

Följande tekniker har använts i projektet:

- **HTML5**: för struktur av webbsidan
- **SCSS**: för styling av webbsidan
- **Parcel**: för automatisering av utvecklingsprocessen
- **Font Awesome**: för ikoner
- **TypeScript**: för applikationslogiken, uppdelad i följande filer:
  - `interface.ts`: definierar `Todo`-interfacet för uppgifter
  - `todo.ts`: innehåller en `TodoList`-klass med metoder för att hantera uppgiftslistan
  - `main.ts`: hanterar DOM-interaktioner och händelselyssnare, samt visar sparade uppgifter när webbsidan laddas in.

### Funktioner / metoder
Följande funktioner / metoder har skapats:

- **Lägga till nya uppgifter**: Användare kan lägga till nya "att göra"-uppgifter med en beskrivning och prioritet.
- **Visa uppgifter**: Uppgifterna visas i en tabell tillsammans med prioritet (högst prio överst), status och åtgärdsknappar.
- **Markera uppgifter som klara**: Användare kan markera uppgifter som klara.
- **Ta bort uppgifter**: Uppgifter kan tas bort från tabellen.
- **Spara uppgifter**: Uppgifter sparas i webbläsarens LocalStorage.
- **Redigera uppgifter**: Användare kan redigera beskrivningen av en uppgift direkt i tabellen.

### LocalStorage
Applikationen använder webbläsarens `LocalStorage` för att spara uppgiftslistan. Detta möjliggör att användaren kan återvända till sin lista även efter att webbläsaren stängts ner. `TodoList`-klassen hanterar att lägga till uppgifter, uppdatera uppgifter, markera uppgifter som klara och ta bort uppgifter, samt att spara och ladda in befintliga uppgifter från `LocalStorage`.

### Interaktioner
Interaktioner hanteras genom `main.ts`, där händelselyssnare kopplas till formulär och knappar för att lägga till nya uppgifter, markera dem som klara eller ta bort dem. Uppgiftslistan visas dynamiskt baserat på innehållet som lagras i `LocalStorage`.

### Utvecklingsprocessen
Parcel har använts som byggverktyg för att förenkla utvecklingsprocessen genom att automatiskt hantera beroenden, kompilera SCSS till CSS och TypeScript till JavaScript.

## Om
* **Av:** Isa Westling
* **Program:** Webbutvecklingsprogrammet
* **År:** 2024
* **Skola:** Mittuniversitetet