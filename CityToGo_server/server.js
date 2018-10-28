const express = require('express')
const app = express()
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const haversine = require('haversine');


app.use(bodyparser.json());

var port = process.env.PORT || 3000;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://citytogo.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000/',
    issuer: "https://citytogo.eu.auth0.com/",
    algorithms: ['RS256']
});

//Disabled jwl token to prevent unauthorized request 
//app.use(jwtCheck);
let arr= [];


app.get('/api/monumenten', (req, res) => {
    fetch('https://opendata.arcgis.com/datasets/628ded9e05184e76b69719eb8ce0e0aa_207.geojson')
        .then(res => res.json())
        .then(json => {res.send(json.features); arr=[];  json.features.forEach(element => {
    

            arr.push(element);

            
        }); } )
        .catch(err=>console.error(err));
})








let currentUserLocation = {
    
    latitude: "",
    longitude: ""
}




function calculateLocation(locationUser,locationDest){
    
    let LocationDS ={
        latitude: locationDest.geometry.coordinates[0][0][0],
        longitude: locationDest.geometry.coordinates[0][0][1]
}
console.log("halloooooo")

    locationDest.geometry.coordinates[0][0][2]=(haversine(currentUserLocation,LocationDS));
    console.log(locationDest.geometry.coordinates[0][0][2]);
    

}


app.post('/api/getNextLocation', (req, res) => {
    
    currentUserLocation.latitude = req.body.latitude;
    currentUserLocation.longitude =req.body.longitude;
    

    arr.forEach(element => {
        calculateLocation(currentUserLocation,element);
    });





let shortest=arr[0];



arr.forEach(element=>{
    console.log(element.geometry.coordinates[0][0][2])
    console.log(shortest.geometry.coordinates[0][0][2])
    if(element.geometry.coordinates[0][0][2] < shortest.geometry.coordinates[0][0][2]){
        shortest=[];
        shortest = element;


    }

});
res.json(shortest);

}
);

app.listen(port, () =>console.log(`Example app listening on port ${port}!`));





