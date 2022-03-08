// Buildings data
var buildingLayer;

function getBuildingData() {
	var baseComputerAddress = document.location.origin;
	var dataAddress = "/api/getGeoJSON/ucfscde/buildings/building_id/location";
	var layerURL = baseComputerAddress + dataAddress;
	$.ajax({url: layerURL, dataType: 'json' ,success: function(result){
		console.log(result);
		// add the JSON layer onto the map - it will appear using the default icons
		// load the geoJSON layer
		buildingLayer = L.geoJson(result).addTo(mymap); 
		buildingLayer.addData(result);
		// iterate over the lines and set style depending on district 
		
		// change the map zoom so that all the data is shown
		 mymap.fitBounds(buildingLayer.getBounds());
	}// end of the inner function
	});// end of the ajax request
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
var ethernetLayer;	

function getEthernetData() {
	var baseComputerAddress = document.location.origin;
	var dataAddress = "/api/getGeoJSON/ucfscde/ethernet_cables/ethernet_id/location";
	var layerURL = baseComputerAddress + dataAddress;
	$.ajax({url: layerURL, dataType: 'json' ,success: function(result){
		 console.log(result); // check that the data is correct
		 var style1={
		 "color": "#ea3008",
		 "weight": 10,
		 "opacity": 0.65
		 };
		 var style2={
		 "color": "#08EA3E",
		 "weight": 10,
		 "opacity": 0.65
		 }; 
		 var style1={
		 "color": "#0811EA",
		 "weight": 10,
		 "opacity": 0.65
		 };
		 // add the JSON layer onto the map - it will appear using the default icons
		 // load the geoJSON layer
		 ethernetLayer = L.geoJson(result).addTo(mymap); 
		 ethernetLayer.addData(result);
		 // iterate over the lines and set style depending on district 
		 ethernetLayer.eachLayer(function(layer) {
			 //console.log(layer);
			 switch (layer.feature.properties.criticality) {
				 case 2:
					layer.setStyle(style1);
					break;
				 case 3:
					layer.setStyle(style2);
					break;
				 default:
					layer.setStyle(style3);
		 }
		});
		 // change the map zoom so that all the data is shown
		 mymap.fitBounds(ethernetLayer.getBounds());
	 } // end of the inner function
	 }); // end of the ajax request
} // end of the getEthernetData function 
function removeEthernetData() {
	try{
		alert("remove the ethernet data here");
		mymap.removeLayer(ethernetLayer);
	}catch(err){
		alert("Layer doesn't exist:" + err);
	}
} 

// Rooms data
var roomLayer;

function getRoomData() {
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
}// end of the getBuildingData function
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
}// end of the getBuildingData function
function removeSensorData() {
	try{
		alert("remove the temperature sensors data here");
		mymap.removeLayer(sensorLayer);
	}catch(err){
		alert("Layer doesn't exist:" + err);
	}
} 