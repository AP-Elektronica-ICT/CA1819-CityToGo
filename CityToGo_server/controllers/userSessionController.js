var UserSession = require('../models/userSessionModel');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const haversine = require('haversine');
let https = require('https');
var secret = require('../config/secret')
const image2base64 = require('image-to-base64');
let arr =[]
let shortest = arr[0];
let sqr;
let resultBingImgLabels
let resultCameraImgLabels
const mongoose = require('mongoose');
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
let currentUserLocation = {

    latitude: "",
    longitude: ""
}
let mongoDB = `mongodb://Admin:${secret.mongoDBpass}@citytogocluster-shard-00-00-93g0j.gcp.mongodb.net:27017,citytogocluster-shard-00-01-93g0j.gcp.mongodb.net:27017,citytogocluster-shard-00-02-93g0j.gcp.mongodb.net:27017/test?ssl=true&replicaSet=CitytogoCluster-shard-0&authSource=admin&retryWrites=true`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("Monuments fetched!");
             arr = [];
            responseJson.features.forEach(element => {
                if (element.properties.Naam !== 'huis') {
                    element.properties.imageUrl = ''
                   arr.push(element);     
                }

            })
          shortest = arr[0];
        })
        .catch((error) => {
            console.error(error);
        });







//.




function calculateLocation(locationUser, locationDest) {

    let LocationDS = {
        latitude: locationDest.geometry.coordinates[0][0][1],
        longitude: locationDest.geometry.coordinates[0][0][0]
    }
    //Distance wordt in de array gestoken
    locationDest.geometry.coordinates[0][0][2] = (haversine(currentUserLocation, LocationDS));

}


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



exports.getNextLocation = function(requ,res){

   console.log(shortest);
    
    
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
            console.log("iniit ")
            console.log(shortest)
            shortest = element;

        }

    });
    console.log(shortest)

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






};

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.quizCategory = function(req,res){

    fetch('https://opentdb.com/api.php?amount=10&category=' + req.body.category + '&type=boolean')
        .then(data => data.json())
        .then((Quizes) => {
            console.log(req.body.category)
            
            res.send(Quizes.results)
        })


};

exports.getImageLabels =function(req,res){

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


}

exports.getAllMonuments = function (req, res) {
    fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then((response) => response.json())
        .then((responseJson) => {
           
            res.send(responseJson.features);
        
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.session_create = function (req, res) {
    var userSession = new UserSession(
        {
            userId: req.body.userId,
            isRunning: req.body.isRunning,
            subSession: {
                startTime: req.body.subSession.startTime,
                stopTime: req.body.subSession.stopTime,
                isFound: req.body.subSession.stopTime,
                monument: req.body.subSession.monument
            }
        });

    userSession.save(function (err) {
        if (err) return res.send(err)

        console.log("session is created!")
        return res.status(200).json(userSession)
    })
};

exports.session_getAll = function (req, res) {
    UserSession.find({}, function (err, docs) {
        var userSessionMap = {};

        if (!docs) return res.status(404).end()

        docs.forEach(function (doc) {
            userSessionMap[doc._id] = doc;
        });

        return res.status(200).json(userSessionMap)
        
    }).catch(err => next(err))
}

exports.session_find = function (req, res) {
    let _userId = req.params.userId;
    UserSession.find({ userId: _userId }, function (err, doc) {
        if (!doc) return res.status(404).end()
        return res.status(200).json(doc)
    })
        .catch(err => next(err))
}

exports.session_update = function (req, res) {
    var conditions = { _id: req.params.id };

    UserSession.updateOne(conditions, req.body)
        .then(doc => {
            if (!doc) return res.status(404).end()
            return res.status(200).json(doc)
        })
        .catch(err => next(err))

}



