const image2base64 = require('image-to-base64');
const haversine = require('haversine');
let https = require('https');
var secret = require('../config/secret')
const fetch = require('node-fetch');



let arr =[]
let backupcheckpoint =[];
let shortest = arr[0];
let sqr;
let response_handler = function (response) {
    let body = '';
    response.on('data', function (d) {
        body += d
    });
    response.on('end', function () {
        let obj = JSON.parse(body);
        if(typeof obj == "undefined" || typeof obj.value[0] == "undefined" ){
            
                shortest = backupcheckpoint[0];
                backupcheckpoint.shift();
                BingRequest();


        }
        else{
            
        shortest.properties.imageUrl = obj.value[0].contentUrl;
        sqr.json(shortest);
        
        
        converBingImageToBase64();}
    });
};

let currentUserLocation = {

    latitude: "",
    longitude: ""
}

fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("Monuments fetched!");
             arr = [];
            responseJson.features.forEach(element => {
                if (element.properties.Naam !== 'huis' && element.properties.Huisnr !== null && element.properties.Straatnaam != 'null') {
                    element.properties.imageUrl = ''
                   arr.push(element);     
                }

            })
          shortest = arr[0];
        })
        .catch((error) => {
            console.error(error);
        });


function calculateLocation(locationUser, locationDest) {

    let LocationDS = {
        latitude: locationDest.geometry.coordinates[0][0][1],
        longitude: locationDest.geometry.coordinates[0][0][0]
    }
    //Distance wordt in de array gestoken
    locationDest.geometry.coordinates[0][0][2] = (haversine(currentUserLocation, LocationDS));

}

exports.getNextLocation = function(requ,res){

  
     
     
     sqr = res;
     currentUserLocation.latitude = requ.body.latitude;
     currentUserLocation.longitude = requ.body.longitude;
     
 
     // voor elke coordinaat van elke monument wordt de afstand berekend tov de huidige locatie
     arr.forEach(element => {
         calculateLocation(currentUserLocation, element);
     });
     shortest = arr[0];
     //let shortest = arr[0];
 
     // Elke element van de array wordt vergeleken met de huidige dichtbijzijndste locatie
     arr.forEach(element => {
 
         if (element.geometry.coordinates[0][0][2] < shortest.geometry.coordinates[0][0][2]) {
             shortest = "";

             
            
             shortest = element;
             backupcheckpoint.push(element);
             
 
         }
 
     });
    
     let tempArray = []
     for(let i = 0; i < 4; i++){

        tempArray.push(backupcheckpoint[(backupcheckpoint.length-2)-i])


     } 
    

    backupcheckpoint = tempArray;
 
     
 
 
    BingRequest()
 
 
 
 };

 function BingRequest(){
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


 }

 function converBingImageToBase64() {
    image2base64(shortest.properties.imageUrl)
        .then((response) => {
            getVisionBingImgLabels(response);

        })
        .catch((error) => {
            console.log(error); ;
        });
}

function getVisionBingImgLabels(response) {
    getVisionImgLabels(response)
        .then(res => res.json())
        .then(json => {
         
        
            module.exports.resultBingImgLabels = json.responses[0].webDetection.webEntities;
    
          
        })
        .catch(err => console.error(err));
}

getVisionImgLabels =async function (imgBase64) {
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

let i=4;
module.exports.getVisionImgLabels = getVisionImgLabels;

module.exports.i = i;