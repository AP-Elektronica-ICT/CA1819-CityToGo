

const express = require('express');
const app = express();
const port = 3000;
const haversine = require('haversine');


let Location=[{
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

]


let currentUserLocation = {
    
    latitude:4.432870,
    longitude: 51.225730
}




function calculateLocation(locationUser,locationDest){
    
    let LocationDS ={
        latitude: locationDest.Latitude,
        longitude: locationDest.Longitude
}
    locationDest.Distance= haversine(currentUserLocation,LocationDS)
    

}


app.get('/api/getNextLocation', (req, res) => {
    Location.forEach(element => {
        calculateLocation(currentUserLocation,element);
    });
let shortestDistance={
    Name: Location[0].Name,
    Longitude:Location[0].Longitude,
    Latitude:Location[0].Latitude,
    Distance:Location[0].Distance,
    Picture:Location[0].Picture


}

Location.forEach(element=>{
    if(element.Distance < shortestDistance.Distance){
        shortestDistance.Name =element.Name;
        shortestDistance.Longitude = element.Longitude;
        shortestDistance.Latitude =element.Latitude;
        shortestDistance.Distance = element.Distance;
        shortestDistance.Picture = element.Picture;
    }

});
res.json(shortestDistance);

}
);

app.listen(port, () =>{console.log(`Example app listening on port ${port}!`);






});