# CityToGo

CityToGo is een ARG (Alternate Reality Game).CityToGo is een ARG (Alternate Reality Game) . Het is een leuke interactieve spel om nieuwe steden te ontdekken. CItyToGo is de eerste city game waarin de nieuwe technologieën zoals AR(Augmented Reality),Image recagnation, realtime maps enz geïmplementeerd zijn. De interactie tussen gebruiker en het spel maakt CityToGo bijzonder special maar niet alleen dat, het bouwt ook je algemene kennis  door vragen te beantwoorden tijdens het spel. 

## Spelregel

Om CityToGo te kunnen spelen, moet je een account aanmaken of je facebook/google account gebruiken. Na aanmelden moet je op ![alt text](https://raw.github.com/AP-Elektronica-ICT/CA1819-CityToGo/tree/master/CityToGo%20app/src/assets/Start.png) drukken om het spel te starten.
De checkpoint (monument) {checkpoint image} verschijnt op de map enkel als je in de range (15 meters)bent van de checkpoint. Om bonussen te verdienen kan je de quizjes {quiz image} oplossen, quizjes zijn klikbaar enkel als je in de afstand van 15 meter bent.  Na het vinden van checkpoint moet je erop tikken en een foto te trekken om je jackpot bonus te unlocken  en een Unique AR te ervaren

### Gebruikte tools en libraries:

- ViroAR  : Het ideale alternatief voor gespecialiseerde game-engines, ViroAR is een platform voor het snel bouwen van ARKit- en ARCore-apps.
- Geolib: Dit npm package wordt gebruikt om afstand en middelpunt  tussen checkpoint en gebruikers te bepalen.
- RandomLocation : Dit npm package wordt gebruikt om random quizes te plaatsen op een cirkel rond de middelpunt tussen de gebruiker en checkpoint. Zo gaan de gebruikers quizes te zien krijgen op de map onderweg naar checkpoint.
- Google vision API : Wordt gebruikt om afbeelding van bezochte checkpoint te vergelijken met de google vision api databank.- 
- React-native Modal : Pop ups
- Auth0: Authenticatie server.
- React-native Maps : 

### Code en Instelling:

- Auth0 domain  en server link (of localhost) wordt hier gegeven. <br />
\CityToGo app\src\config.js
- Aantal quizes per afstand wordt hier bepaalt op kaart getRandomQuizes() <br />
\CityToGo app\src\screens\Home.js
- Gebruikers kunnen op een bepaalde afstand (in meter)van Quizes, AR quizes kunnen triggeren door op  te tikken. Het afstand wordt hier bepaalt getQuizpopup()  <br />
\CityToGo app\src\screens\Home.js
- Gebruikers kunnen op een bepaalde afstand(in meter) van Checkpoint de Camera kunnen triggeren door op checkpoint marker te tikken. Het afstand wordt hier bepaalt goToCameraRecognition()  <br />
\CityToGo app\src\screens\Maps.js

#### Developers
Mohammed Laghzaoui
Shakir Pathman
Imad Hamroun
