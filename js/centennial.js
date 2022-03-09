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

// Buildings data
var buildingLayer;

function getBuildingData() {
	//Check the existence of variable, add the data only if variable is undefined
	if (!mymap.hasLayer(buildingLayer)){
		var baseComputerAddress = document.location.origin;
		var dataAddress = "/api/getGeoJSON/ucfscde/buildings/building_id/location";
		var layerURL = baseComputerAddress + dataAddress;
		$.ajax({url: layerURL, dataType: 'json' ,success: function(result){
			console.log(result);
			// add the JSON layer onto the map - it will appear using the default icons
			// load the geoJSON layer
			buildingLayer = L.geoJson(result).addTo(mymap); 
			buildingLayer.addData(result);
			
			// change the map zoom so that all the data is shown
			 mymap.fitBounds(buildingLayer.getBounds());
		}// end of the inner function
		});// end of the ajax request
	}
	else{
		alert("Buildings Layer already exist!");
	}
}// end of the getBuildingData function
function removeBuildingData() {
	try{
		alert("remove the buildings data here");
		mymap.removeLayer(buildingLayer);
	}catch(err){
		alert("Layer doesn't exist:" + err);
	}
} 

// Ethernet cables data
var universityLayer;	

function getUniversityData() {
	//Check the existence of variable, add the data only if variable is undefined
	if (!mymap.hasLayer(universityLayer)){
		var baseComputerAddress = document.location.origin;
		var dataAddress = "/api/getGeoJSON/ucfscde/university/university_id/location";
		var layerURL = baseComputerAddress + dataAddress;
		$.ajax({url: layerURL, dataType: 'json' ,success: function(result){
			 //console.log(result); // check that the data is correct
			 // add the JSON layer onto the map - it will appear using the default icons
			 // load the geoJSON layer
			 universityLayer = L.geoJson(result).addTo(mymap); 
			 universityLayer.addData(result);
			 
			 // change the map zoom so that all the data is shown
			 mymap.fitBounds(universityLayer.getBounds());
		 } // end of the inner function
		 }); // end of the ajax request
	}
	else{
		alert("University Layer already exist!");
	}
} // end of the getUniversityData function 
function removeUniversityData() {
	try{
		alert("remove the university data here");
		mymap.removeLayer(universityLayer);
	}catch(err){
		alert("Layer doesn't exist:" + err);
	}
} 

// Rooms data
var roomLayer;

function getRoomData() {
	//Check the existence of variable, add the data only if variable is undefined
	if (!mymap.hasLayer(roomLayer)){
		var baseComputerAddress = document.location.origin;
		var dataAddress = "/api/getGeoJSON/ucfscde/rooms/room_id/location";
		var layerURL = baseComputerAddress + dataAddress;
		$.ajax({url: layerURL, dataType: 'json' ,success: function(result){
			console.log(result);
			// add the JSON layer onto the map - it will appear using the default icons
			// load the geoJSON layer
			roomLayer = L.geoJson(result).addTo(mymap); 
			roomLayer.addData(result);
			// iterate over the lines and set style depending on district 
			
			// change the map zoom so that all the data is shown
			 mymap.fitBounds(roomLayer.getBounds());
		}// end of the inner function
		});// end of the ajax request
	}
	else{
		alert("Rooms Layer already exist!");
	}
}// end of the getRoomData function
function removeRoomData() {
	try{
		alert("remove the rooms data here");
		mymap.removeLayer(roomLayer);
	}catch(err){
		alert("Layer doesn't exist:" + err);
	}
} 

// Temperature sensors data
var sensorLayer;

function getSensorData() {
	//Check the existence of variable, add the data only if variable is undefined
	if (!mymap.hasLayer(sensorLayer)){
		var baseComputerAddress = document.location.origin;
		var dataAddress = "/api/getGeoJSON/ucfscde/temperature_sensors/sensor_id/location";
		var layerURL = baseComputerAddress + dataAddress;
		$.ajax({url: layerURL, dataType: 'json' ,success: function(result){
			console.log(result);
			// add the JSON layer onto the map - it will appear using the default icons
			// load the geoJSON layer
			sensorLayer = L.geoJson(result).addTo(mymap); 
			sensorLayer.addData(result);
			// iterate over the lines and set style depending on district 
			
			// change the map zoom so that all the data is shown
			 mymap.fitBounds(sensorLayer.getBounds());
		}// end of the inner function
		});// end of the ajax request
	}
	else{
		alert("Temperature sensors Layer already exist!");
	}
}// end of the getSensorData function
function removeSensorData() {
	try{
		alert("remove the temperature sensors data here");
		mymap.removeLayer(sensorLayer);
	}catch(err){
		alert("Layer doesn't exist:" + err);
	}
} 