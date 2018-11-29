const express = require('express')
const app = express()
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const haversine = require('haversine');

//const GoogleImages = require('google-images');
 
//const client = new GoogleImages('014026545629182192558:tlzt4j3t7ne', 'AIzaSyA7jYzpqhunuHkAZoszNRz67meScjjM_0w');
'use strict';
let https = require('https');


let subscriptionKey = '';
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';
let term = '';

/*let request_params = {
    
    method : 'GET',
    hostname : host,
    path : path + '?q=' + encodeURIComponent(term),
    headers : {
        
            'Content-Type': 'application/json',
         
    'Ocp-Apim-Subscription-Key' : subscriptionKey,
    }
};*/
let response_handler = function (response) {
    let body='';
    response.on('data', function (d) {
        body +=d
    });
    response.on('end', function () {
       // console.log("init");
        let obj = JSON.parse(body);
       // console.log(obj);
      // console.log(obj._type);
        shortest.properties.imageUrl =obj.value[0].contentUrl;
     // console.log(obj.value[0].contentUrl);
     // shortest.
      // let firstImageResult = imageResults.value[0];
      //  console.log(`Image result count: ${imageResults.value.length}`);
     //   console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
     //   console.log(`First image web search url: ${firstImageResult.webSearchUrl}`);
     });
};







app.use(bodyparser.json());

var port = process.env.PORT || 3000;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://shakir01.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000/',
    issuer: "https://shakir01.eu.auth0.com/",
    algorithms: ['RS256']
});

//Disabled jwl token to prevent unauthorized request 
//app.use(jwtCheck);
let arr = [];

//Haalt alle data van opendata api
app.get('/api/monumenten', (req, res) => {
    fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then(res => res.json())
        .then(json => {
            res.send(json.features);
            arr = [];
            json.features.forEach(element => {
                // pusht data van api in een variable
                arr.push(element);
            });
        })
        .catch(err => console.error(err));
})

let currentUserLocation = {

    latitude: "",
    longitude: ""
}

//berekent afstand tussen een monument en de huidige locatie
function calculateLocation(locationUser, locationDest) {

    let LocationDS = {
        latitude: locationDest.geometry.coordinates[0][0][1],
        longitude: locationDest.geometry.coordinates[0][0][0]
    }
   // console.log("Afstand tot bestemming is "+LocationDS);
    //Distance wordt in de array gestoken
    locationDest.geometry.coordinates[0][0][2] = (haversine(currentUserLocation, LocationDS));
    //console.log(locationDest.geometry.coordinates[0][0][2]);
}

let shortest =arr[0];
// Huidige locatie wordt hier gegeven
app.post('/api/getNextLocation', (requ, res) => {

    currentUserLocation.latitude = requ.body.latitude;
    currentUserLocation.longitude = requ.body.longitude;
    console.log(requ.body)

    // voor elke coordinaat van elke monument wordt de afstand berekend tov de huidige locatie
    arr.forEach(element => {
        calculateLocation(currentUserLocation, element);
    });
    shortest = arr[0];
    //let shortest = arr[0];

    // Elke element van de array wordt vergeleken met de huidige dichtbijzijndste locatie
    arr.forEach(element => {

        if (element.geometry.coordinates[0][0][2] < shortest.geometry.coordinates[0][0][2]) {
            shortest = [];
            
            shortest = element;
        
        }

    });
  let  term = `'${shortest.properties.Naam} gebouw'`;
    console.log(term);
    let req = https.request(
        
        
    {
    
        method : 'GET',
        hostname : 'api.cognitive.microsoft.com',
        path : '/bing/v7.0/images/search' + '?q=' + encodeURIComponent(term),
        headers : {
            
                'Content-Type': 'application/json',
             
        'Ocp-Apim-Subscription-Key' : '2d238b17838c477fbf02db7183468e51',
        }
    },
    
    
    response_handler);
    req.end()

    res.json(shortest);
}
);

app.listen(port, () => {
    

    fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("Monuments fetched!");
            //return responseJson
            arr = [];
            responseJson.features.forEach(element => {
                // pusht data van api in een variable
                arr.push(element);
            })
        })
        .catch((error) => {
            console.error(error);
            throw error
        });
});