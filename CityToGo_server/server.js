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
            let des ={
                id:"",
                latitude:"",
                longitude:"",
                Distance:""

            }

           des.id= element.properties.OBJECTID;
           des.latitude=element.geometry.coordinates[0][0][0];
           des.longitude =element.geometry.coordinates[0][0][1];
            arr.push(des);

            
        }); console.log(arr)} )
        .catch(err=>console.error(err));
})





/*let Location=[{
    Name: "Lange wapper",
    Longitude: 51.204962,
    Latitude:4.474973,
    Distance:"",
    Picture:"langeWapper.jpg"
},

{Name: "Lange Fapper",
Longitude: 51.259996,
Latitude:4.517183,
Distance:"",
Picture:"langeFapper.jpg"},


{Name: "Lange Chapper",
Longitude: 51.272885,
Latitude:4.422812,
Distance:"",
Picture:"langeChapper.jpg"},


{Name: "Lange kapper",
Longitude: 51.276885,
Latitude:4.428892,
Distance:"",
Picture:"langeKapper.jpg"},


{Name: "Lange Zapper",
Longitude: 51.273529,
Latitude:4.370993,
Distance:"",
Picture:"langeZapper.jpg"},


{Name: "Lange Mapper",
Longitude: 51.253550,
Latitude:4.438941,
Distance:"",
Picture:"langeMapper.jpg"},


{Name: "Lange Papper",
Longitude: 51.261285,
Latitude:4.446491,
Distance:"",
Picture:"langePapper.jpg"},

]*/


let currentUserLocation = {
    
    latitude: "",
    longitude: ""
}




function calculateLocation(locationUser,locationDest){
    
    let LocationDS ={
        latitude: locationDest.latitude,
        longitude: locationDest.longitude
}
    locationDest.Distance= haversine(currentUserLocation,LocationDS)
    

}


app.post('/api/getNextLocation', (req, res) => {
    
    currentUserLocation.latitude = req.body.latitude;
    currentUserLocation.longitude =req.body.longitude;
    

    arr.forEach(element => {
        calculateLocation(currentUserLocation,element);
    });


let shortestDistance={
    id: arr[0].id,
    Longitude:arr[0].longitude,
    Latitude:arr[0].latitude,
    Distance:arr[0].Distance,
   


}

arr.forEach(element=>{
    if(element.Distance < shortestDistance.Distance){
        shortestDistance.id =element.id;
        shortestDistance.Longitude = element.longitude;
        shortestDistance.Latitude =element.latitude;
        shortestDistance.Distance = element.Distance;
        
    }

});
res.json(shortestDistance);

}
);

app.listen(port, () =>console.log(`Example app listening on port ${port}!`));





