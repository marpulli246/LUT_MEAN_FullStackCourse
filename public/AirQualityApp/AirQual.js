
      // Get airqual
request = new XMLHttpRequest;
request.open('GET', 'http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=a9cccd06-2db2-400b-bf14-68f967fa2440', true);
      
      
request.onload = function() {
    if (request.status >= 200 && request.status < 400){
          // Success!
        data = JSON.parse(request.responseText);
        console.log(data);
        cTime = data.data.current.pollution.ts;
        lng = data.data.location.coordinates[0];
        lat = data.data.location.coordinates[1];
        cPoll = data.data.current.pollution.aqius;
        cTemp = data.data.current.weather.tp;
        cPress = data.data.current.weather.pr;
        cWind = data.data.current.weather.ws;
        cWd = data.data.current.weather.wd;
        document.getElementById("AirQ_Time").innerHTML=cTime;
        document.getElementById("AirQ_Pol").innerHTML=cPoll;
        document.getElementById("AirQ_T").innerHTML=cTemp;
        document.getElementById("AirQ_Pres").innerHTML=cPress;
        document.getElementById("AirQ_WS").innerHTML=cWind;
        document.getElementById("AirQ_WD").innerHTML=cWd;
        // showMap(lng, lat)
    } 
    else {
          // We reached our target server, but it returned an error
      
        }
};

request.onerror = function() {
        // There was a connection error of some sort
};

request.send();

function showMap(mlng,mlat){
mapboxgl.accessToken = 'pk.eyJ1IjoibWFycHVsbGkiLCJhIjoiY2tvNHBzYmtyMWQzcDJucDk4ODBqbWFidCJ9._No-4U5732IKq2fLP_sKbQ';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [mlng,mlat], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

var marker = new mapboxgl.Marker()
.setLngLat([mlng, mlat])
.addTo(map);
}