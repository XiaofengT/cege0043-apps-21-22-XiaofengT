// the following script will load the map and set the default view and zoom, as well as loading the basemap tiles
// load the map
var mymap;
// create an array to store all the location tracking points
var trackLocationLayer =[];
// store the ID of the locaiton tracker so that it can be used to switch the location tracking off 
var geoLocationID;
// load the tiles
function loadLeafletMap(){
mymap = L.map('mapContainer').setView([51.505, -0.09], 9);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
maxZoom: 18,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1
}).addTo(mymap);
}
function trackLocation(){
	if(navigator.geolocation){
		geoLocationID = navigator.geolocation.watchPosition(showPosition);
	}else{
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
}
function showPosition(position){
	//add the new point into the array
	trackLocationLayer.push(L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap));
}

// remove the previous mark if user moves
function removePositionPoints(){
	// disable the location tracking so that a new point won't be added while you are removing the old points
	navigator.geolocation.clearWatch(geoLocationID);
	for(var i=trackLocationLayer.length-1; i>-1; i--){
		console.log("removing point"+i+"which has coordinates"+trackLocationLayer[i].getLatLng());
		mymap.removeLayer(trackLocationLayer[i])
	}
}