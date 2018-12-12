const express = require('express')
const app = express()
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const haversine = require('haversine');
let https = require('https');
const image2base64 = require('image-to-base64');
var secret = require('./config/secret')

// Set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = `mongodb://Admin:${secret.mongoDBpass}@citytogocluster-shard-00-00-93g0j.gcp.mongodb.net:27017,citytogocluster-shard-00-01-93g0j.gcp.mongodb.net:27017,citytogocluster-shard-00-02-93g0j.gcp.mongodb.net:27017/test?ssl=true&replicaSet=CitytogoCluster-shard-0&authSource=admin&retryWrites=true`;
//let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
        converBingImageToBase64();
    });
};

var test = "22";
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
let arrQuiz = [];

app.use('/', require('./routes'));

let arr = [];
app.get('/api/monumenten', (req, res) => {
    fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then(res => { res.json() })
        .then(json => {
            res.send(json.features);
            // arr = [];
            // json.features.forEach(element => {
            //     // pusht data van api in een variable
            //     if (!element.Naam == 'huis')
            //         arr.push(element);
            // });
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



    let term = `'${shortest.properties.Naam} ${shortest.properties.Straatnaam} ${shortest.properties.Straatnaam} ${shortest.properties.Huisnr} ${shortest.properties.District}'`;

    let req = https.request(
        {
            method: 'GET',
            hostname: 'api.cognitive.microsoft.com',
            path: '/bing/v7.0/images/search' + '?q=' + encodeURIComponent(term),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': secret.azureAccesKey,
            }
        },
        response_handler);

    req.end();

});

//--- Google vision ipa implementation ---

let resultBingImgLabels
let resultCameraImgLabels

app.post('/api/getImageLabels', (req, res) => {
    var imgBase64 = req.body.image
    let resultMatch = 0
    getVisionImgLabels(imgBase64)
        .then(res => res.json())
        .then(json => {
            resultCameraImgLabels = json.responses[0].webDetection.webEntities

            resultBingImgLabels.forEach((e1) => resultCameraImgLabels.forEach((e2) => {
                if (e1.description == e2.description)
                    resultMatch += 1
            }))

            console.log(resultMatch)

            if (resultMatch >= 2)
                res.send(JSON.stringify('match'))
            else
                res.send(JSON.stringify('no match'))
        })
        .catch(err => console.error(err));
})


function converBingImageToBase64() {
    image2base64(shortest.properties.imageUrl)
        .then((response) => {
            getVisionBingImgLabels(response);

        })
        .catch((error) => {
            console.log(error);
        });
}

function getVisionBingImgLabels(response) {
    getVisionImgLabels(response)
        .then(res => res.json())
        .then(json => {
            resultBingImgLabels = json.responses[0].webDetection.webEntities
        })
        .catch(err => console.error(err));
}

async function getVisionImgLabels(imgBase64) {
    const body = {
        "requests": [
            {
                "image": {
                    "content": imgBase64
                },
                "features": [
                    {
                        "type": "WEB_DETECTION",
                        "maxResults": 10
                    }
                ]
            }
        ]
    };
    return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${secret.googleKey}`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
}

//---------------------------

app.listen(port, () => {
    fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("Monuments fetched!");
            arr = [];
            responseJson.features.forEach(element => {
                // pusht data van api in een variable
                if (element.properties.Naam !== 'huis') {
                    element.properties.imageUrl = ''
                    arr.push(element);
                }
                //     }

            })
        })
        .catch((error) => {
            console.error(error);
        });
});
//Vragen fetchen van opentdb api voor Quizes en stuur het door naar front-end per gevraagde category
app.post('/api/quizCategory', (req, res) => {
    fetch('https://opentdb.com/api.php?amount=10&category=' + req.body.category + '&type=boolean')
        .then(data => data.json())
        .then((Quizes) => {
            console.log(req.body.category)
            arrQuiz.push(Quizes.results);
            res.send(Quizes.results)
        })
})



