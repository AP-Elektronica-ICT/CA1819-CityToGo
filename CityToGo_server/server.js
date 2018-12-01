const express = require('express')
const app = express()
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const haversine = require('haversine');

'use strict';
let https = require('https');

app.use(bodyparser.json({ limit: '10mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }))

let response_handler = function (response) {
    let body = '';
    response.on('data', function (d) {
        body += d
    });
    response.on('end', function () {
        let obj = JSON.parse(body);
        shortest.properties.imageUrl = obj.value[0].contentUrl;
        sqr.json(shortest);
        console.log(shortest);
    });
};


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
app.use(jwtCheck);

let arr = [];
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
    //Distance wordt in de array gestoken
    locationDest.geometry.coordinates[0][0][2] = (haversine(currentUserLocation, LocationDS));
}

let shortest = arr[0];
let sqr;
// Huidige locatie wordt hier gegeven
app.post('/api/getNextLocation', (requ, res) => {
    sqr = res;
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
    let term = `'${shortest.properties.Straatnaam} ${shortest.properties.Huisnr} ${shortest.properties.District}'`;

    let req = https.request(
        {
            method: 'GET',
            hostname: 'api.cognitive.microsoft.com',
            path: '/bing/v7.0/images/search' + '?q=' + encodeURIComponent(term),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': '2d238b17838c477fbf02db7183468e51',
            }
        },
        response_handler);
    req.end();
});

app.post('/api/getImageLabels', (req, res) => {
    const body = {
        "requests": [
            {
                "image": {
                    "content": req.body.image
                },
                "features": [
                    {
                        "type": "WEB_DETECTION",
                        "maxResults": 5
                    }
                ]
            }
        ]
    }

    fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB4HgIDhaV6sv3ddo_Xol9r4fDLj7RpOaU', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => {
            res.send(json.responses[0].webDetection.webEntities)
            console.log(json.responses[0].webDetection.webEntities)
        })
        .catch(err => console.error(err));
})

app.listen(port, () => {
    fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("Monuments fetched!");
            //return responseJson
            arr = [];
            responseJson.features.forEach(element => {
                // pusht data van api in een variable
                element.properties.imageUrl = ''
                arr.push(element);
            })
        })
        .catch((error) => {
            console.error(error);
            throw error
        });
});