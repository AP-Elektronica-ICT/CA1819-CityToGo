# CityToGo

CityToGo is een ARG (Alternate Reality Game). Het is een leuke interactieve spel om nieuwe steden te ontdekken. CItyToGo is de eerste city game waarin de nieuwe technologieën zoals AR(Augmented Reality),Image recagnation, realtime maps enz geïmplementeerd zijn. De interactie tussen gebruiker en het spel maakt CityToGo bijzonder speciaal maar niet alleen dat, het bouwt ook je algemene kennis op door vragen te stellen over verschillende thema's zoals kunst,geschiedenis,sport,techonolgie enz. 

## Spelregel

Om CityToGo te kunnen spelen, moet je een account aanmaken of met je facebook/google account aanmelden. Na aanmelden moet je op ![start](https://github.com/AP-Elektronica-ICT/CA1819-CityToGo/blob/master/CityToGo%20app/src/assets/Start.png) drukken om het spel te starten.
De kaart kan niet uitzoomen om je monument te zien, dus je moet zelf je weg vinden tot de opgegevende monument  ![checkpoint](https://github.com/AP-Elektronica-ICT/CA1819-CityToGo/blob/master/CityToGo%20app/src/assets/icons/rsz_check.png) . Om bonussen te verdienen kan je langs quizes  ![quiz](https://github.com/AP-Elektronica-ICT/CA1819-CityToGo/blob/master/CityToGo%20app/src/assets/icons/Group4.png) gaan en je bonussen ontvangen. Quizes zijn klikbaar enkel als je in de afstand van 15 meter bent.  Na het vinden van checkpoint moet je erop tikken om camera te triggeren. Daarna een foto  trekken om je jackpot bonus te unlocken  en een Unique AR te ervaren

## Front-end
Front-end is ontwikkelt in cross-platform framework, React Native. Om data efficiënter te bewerken en weergeven is gebruik geweest van Redux. Redux is een voorspelbare statuscontainer voor JavaScript-apps.Redux maakt het eenvoudig om de status van uw applicatie te beheren. Een andere manier om hiernaar te kijken - het helpt u bij het beheren van de gegevens die u weergeeft en hoe u reageert op acties van gebruikers.

### Gebruikte tools en libraries:

- **ViroAR**  : Het ideale alternatief voor gespecialiseerde game-engines, ViroAR is een platform voor het snel bouwen van ARKit- en ARCore-apps.
- **Geolib**: Dit npm package wordt gebruikt om afstand en middelpunt  tussen checkpoint en gebruikers te bepalen.
- **RandomLocation** : Dit npm package wordt gebruikt om random quizes te plaatsen op een cirkel rond de middelpunt tussen de gebruiker en checkpoint. Zo gaan de gebruikers quizes te zien krijgen op de map onderweg naar checkpoint.
- **Google vision API** : Wordt gebruikt om afbeelding van bezochte checkpoint te vergelijken met de google vision api databank.- 
- **React-native Modal** : Pop ups
- **Auth0**: Authenticatie server.
- **React-native Maps** : 

### Code en Instelling:

- Auth0 domain en link naar backend (of localhost) wordt hier gegeven. <br />
\CityToGo app\src\config.js
- Aantal quizes op  bepaalde afstand(in meters) tussen checkpoint en speler wordt hier bepaalt op kaart **getRandomQuizes()** <br />
\CityToGo app\src\screens\Home.js
- Gebruikers kunnen op een bepaalde afstand (in meter)van Quizes, AR quizes kunnen triggeren door op  te tikken. Het afstand wordt hier bepaalt **getQuizpopup()**  <br />
\CityToGo app\src\screens\Home.js
- Gebruikers kunnen op een bepaalde afstand(in meter) van Checkpoint de Camera kunnen triggeren door op checkpoint marker te tikken. Het afstand wordt hier bepaalt **goToCameraRecognition()**  <br />
\CityToGo app\src\screens\Maps.js

#### Developers
Mohammed Laghzaoui<br />
Shakir Pathman<br />
Imad Hamroun<br />
