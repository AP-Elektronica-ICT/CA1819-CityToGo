const express = require('express')
const app = express()
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const haversine = require('haversine');

//app.use(bodyparser.json());
app.use(bodyparser.json({limit: '10mb', extended: true}))
app.use(bodyparser.urlencoded({limit: '10mb', extended: true}))


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

    //Distance wordt in de array gestoken
    locationDest.geometry.coordinates[0][0][2] = (haversine(currentUserLocation, LocationDS));
    //console.log(locationDest.geometry.coordinates[0][0][2]);
}

// Huidige locatie wordt hier gegeven
app.post('/api/getNextLocation', (req, res) => {

    currentUserLocation.latitude = req.body.latitude;
    currentUserLocation.longitude = req.body.longitude;
    console.log(req.body)

    // voor elke coordinaat van elke monument wordt de afstand berekend tov de huidige locatie
    arr.forEach(element => {
        calculateLocation(currentUserLocation, element);
    });

    let shortest = arr[0];

    // Elke element van de array wordt vergeleken met de huidige dichtbijzijndste locatie
    arr.forEach(element => {

        if (element.geometry.coordinates[0][0][2] < shortest.geometry.coordinates[0][0][2]) {
            shortest = [];
            shortest = element;
        }

    });
    res.json(shortest);
});

//#Google Vision API

// Creates a client
// const client = new vision.ImageAnnotatorClient({
//     project_id: "citytogo-219013",
//     keyFilename: 'cloud-vision-key.json'
// });

// bodyParser = {
//     json: { limit: '50mb', extended: true },
//     urlencoded: { limit: '50mb', extended: true }
// };




app.post('/api/getImageLabels', (req, res) => {
    // Performs label detection on the image file
    //var imageBase64 = json.Parse

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
    // client
    //     .labelDetection({
    //         image: {content : req.body.image}
    //     })
    //     .then(results => {
    //         const labels = results[0].labelAnnotations;
    //         console.log('Labels:');
    //         labels.forEach(label => console.log(label.description));

    //         res.json(labels)
    //     })
    //     .catch(err => {
    //         res.json(err)
    //         console.error('ERROR:', err);
    //     });
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
                arr.push(element);
            })
        })
        .catch((error) => {
            console.error(error);
            throw error
        });
});