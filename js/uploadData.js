// the following script will load the map and set the default view and zoom, as well as loading the basemap tiles
// load the map
var mymap;
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

var user_id;
var width; // NB – keep this as a global variable
var popup = L.popup(); // keep this as a global variable
var assetLayer; // store the geoJSON feature so that we can remove it if the screen is resized
// create an array to store all the location tracking points
var trackLocationLayer = [];
var geoLocationID;
function setMapClickEvent() {
	// get the window width
	width = $(window).width();
	// we use the bootstrap Medium and Large options for the asset location capture
	// and the small and XS options for the condition option
	// see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
	if (width < 992) {//the condition capture – 992px is defined as 'medium' by bootstrap
		// set up a point with click functionality
		if (mymap.hasLayer(assetLayer)){
			mymap.removeLayer(assetLayer);
		}
		// cancel the map onclick event using off ..
		mymap.off('click',onMapClick);
		setUpPointClick(); 
		trackLocation();
	}
	else { // the asset creation page
		// remove the map point if it exists
		if (mymap.hasLayer(assetLayer)){
			mymap.removeLayer(assetLayer);
		}
		if (mymap.hasLayer(trackLocationLayer)){
			mymap.removeLayer(trackLocationLayer);
		}
		// the on click functionality of the MAP should pop up a blank asset creation form
		mymap.on('click', onMapClick);
		//mymap.off('click', setUpPointClick)
		//if (!assetLayer){
		setUpReadOnlyClick();
		//}
	}
}

function getUserId() {
	var baseComputerAddress = document.location.origin;
	var currentUserId = '/api/getUserId';
	var getIdURL = baseComputerAddress + currentUserId;
	$.ajax({url: getIdURL, crossDomain: true, async: false, success: function(result){
		 user_id = result["user_id"];
	}});
}

function trackLocation(){
	if(navigator.geolocation){
		geoLocationID = navigator.geolocation.watchPosition(showPosition);
	}else{
		alert("Geolocation is not supported by this browser.");
	}
}
function showPosition(position){
	removePositionPoints();
	//add the new point into the array
	var userlat = position.coords.latitude;
	var userlng = position.coords.longitude;
	trackLocationLayer.push(L.marker([userlat,userlng]).addTo(mymap));
	console.log(assetLayer);
	closestAssetPoint(userlat, userlng);
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

function setUpPointClick() {
	// create a geoJSON feature (in your assignment code this will be replaced
	// by an AJAX call to load the asset points on the map
	// and add it to the map and zoom to that location
	// use the mapPoint variable so that we can remove this point layer on
	// the on click functionality of the POINT should pop up partially populated condition form so that the user can select the condition they require
	var baseComputerAddress = document.location.origin;
	var currentUserId = user_id;
	var dataAddress = '/api/geoJSONUserId/'+currentUserId;
	var assetURL = baseComputerAddress + dataAddress;
	$.ajax({url: assetURL, 
			dataType: 'json', 
			async: false,
			success: function(result){
				var conditionMarker1 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'red'
				});
				var conditionMarker2 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'purple'
				});
				var conditionMarker3 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'pink'
				});
				var conditionMarker4 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'blue'
				});
				var conditionMarker5 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'green'
				});
				var conditionMarker6 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'gray'
				});
				assetLayer = L.geoJson(
								result,{
								pointToLayer: function(feature, latlng){
									var popUpHTML = getPopupHTML(
											feature.properties.asset_id, 
											feature.properties.asset_name,
											feature.properties.installation_date,
											feature.properties.condition_description);
									if (feature.properties.condition_description == 'Element is in very good condition'){
										return L.marker(latlng, {icon: conditionMarker1}).bindPopup(popUpHTML)	
									}
									if (feature.properties.condition_description == 'Some aesthetic defects, needs minor repair'){
										return L.marker(latlng, {icon: conditionMarker2}).bindPopup(popUpHTML)	
									}
									if (feature.properties.condition_description == 'Functional degradation of some parts, needs maintenance'){
										return L.marker(latlng, {icon: conditionMarker3}).bindPopup(popUpHTML)	
									}
									if (feature.properties.condition_description == 'Not working and maintenance must be done as soon as reasonably possible'){
										return L.marker(latlng, {icon: conditionMarker4}).bindPopup(popUpHTML)	
									}
									if (feature.properties.condition_description == 'Not working and needs immediate, urgent maintenance'){
										return L.marker(latlng, {icon: conditionMarker5}).bindPopup(popUpHTML)	
									}
									else{
										return L.marker(latlng, {icon: conditionMarker6}).bindPopup(popUpHTML)	
									}
								},
								}
								).addTo(mymap); 
			assetLayer.addData(result);
			mymap.fitBounds(assetLayer.getBounds());
			}
	});
}

function setUpReadOnlyClick() {
	// create a geoJSON feature (in your assignment code this will be replaced
	// by an AJAX call to load the asset points on the map
	// and add it to the map and zoom to that location
	// use the mapPoint variable so that we can remove this point layer on
	// the on click functionality of the POINT should pop up partially populated condition form so that the user can select the condition they require
	var baseComputerAddress = document.location.origin;
	var currentUserId = user_id;
	var dataAddress = '/api/geoJSONUserId/'+currentUserId;
	var assetURL = baseComputerAddress + dataAddress;
	$.ajax({url: assetURL, 
			dataType: 'json', 
			success: function(result){
				var conditionMarker1 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'red'
				});
				var conditionMarker2 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'purple'
				});
				var conditionMarker3 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'pink'
				});
				var conditionMarker4 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'blue'
				});
				var conditionMarker5 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'green'
				});
				var conditionMarker6 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'gray'
				});
				assetLayer = L.geoJson(
								result,{
								pointToLayer: function(feature, latlng){
									var conditionPopup = "<b>Latest condition situation: </b><br/>" + feature.properties.condition_description;
									if (feature.properties.condition_description == 'Element is in very good condition'){
										return L.marker(latlng, {icon: conditionMarker1}).bindPopup(conditionPopup)	
									}
									if (feature.properties.condition_description == 'Some aesthetic defects, needs minor repair'){
										return L.marker(latlng, {icon: conditionMarker2}).bindPopup(conditionPopup)	
									}
									if (feature.properties.condition_description == 'Functional degradation of some parts, needs maintenance'){
										return L.marker(latlng, {icon: conditionMarker3}).bindPopup(conditionPopup)	
									}
									if (feature.properties.condition_description == 'Not working and maintenance must be done as soon as reasonably possible'){
										return L.marker(latlng, {icon: conditionMarker4}).bindPopup(conditionPopup)	
									}
									if (feature.properties.condition_description == 'Not working and needs immediate, urgent maintenance'){
										return L.marker(latlng, {icon: conditionMarker5}).bindPopup(conditionPopup)	
									}
									else{
										return L.marker(latlng, {icon: conditionMarker6}).bindPopup('No Condition Captured')
									}
								},
								}
								).addTo(mymap); 
			assetLayer.addData(result);
			mymap.fitBounds(assetLayer.getBounds());
			}
	});
}

function getPopupHTML(assetID, asset_name, installation_date, previousConditionValue){
	var htmlString	= "<div id='asset_name' hidden>"+asset_name+"</div>"+
	"<div id='asset_name_text'>Asset Name: "+asset_name+"</div>";
	htmlString = htmlString +"<div id='asset_id'>Asset ID: "+ assetID + "</div>";
	htmlString = htmlString +"<div id='user_id' hidden>"+user_id+"</div>";
	htmlString = htmlString +'<p>Select the condition description</p>';
	htmlString = htmlString +"<input type='radio' name='condition_description' id='"+assetID+"_1' />Element is in very good condition<br />";
	htmlString = htmlString +"<input type='radio' name='condition_description' id='"+assetID+"_2' />Some aesthetic defects, needs minor repair<br />";
	htmlString = htmlString +"<input type='radio' name='condition_description' id='"+assetID+"_3' />Functional degradation of some parts, needs maintenance<br />";
	htmlString = htmlString +"<input type='radio' name='condition_description' id='"+assetID+"_4' />Not working and maintenance must be done as soon as reasonably possible<br />";
	htmlString = htmlString +"<input type='radio' name='condition_description' id='"+assetID+"_5' />Not working and needs immediate, urgent maintenance<br />";
	htmlString = htmlString +"<div id=previousConditionValue_"+assetID+" style='display: none;'>"+previousConditionValue+"</div>";
	htmlString = htmlString +"<div id=asset_"+assetID+" style='display: none;'>"+assetID+"</div>";
	htmlString = htmlString +"<p>Click here to save your asset</p>";
	htmlString = htmlString +"<button id='saveCondition' onclick='checkCondition("+assetID+");return false;'>Save condition information</button>"+
	'<br />'+
	'<div id="conditionResult">The result goes here</div>'+
	'<hr>'+
	''+
	'<label for="deleteID">Delete ID</label><input type="text" size="25" id="deleteID"/><br />'+
	'<button id="deleteCondition" onclick="deleteSingleCondition()">Delete Condition</button>'+
	'<div id="deleteConditionResponse">The result goes here</div>';
	return htmlString;
}

function onMapClick(e) {
	var formHTML = basicFormHtml(e);
	popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()+"<br />"+formHTML).openOn(mymap);
}
function basicFormHtml(e) {
	var latitude = e.latlng.lat;
	var longitude = e.latlng.lng;
	var myvar = '<label for="asset_name">Asset name</label><input type="text" size="25" id="asset_name"/><br />'+
	'<label for="installation_date">Installation date</label><input type="date" id="installation_date"/><br />'+
	'<div id= "latitude" hidden>' + latitude +'</div>'+
	'<div id= "longitude" hidden>'+ longitude +'</div>'+
	"<div id='user_id' hidden>"+user_id+"</div>"+
	''+
	'<p>Click here to save your asset</p>'+
	'<button id="saveAsset" onclick="saveNewAsset()">Save new asset</button>'+
	'<br />'+
	'<br />'+
	'<div id="responseDIV">The result goes here</div>'+
	'<hr>'+
	''+
	'<label for="deleteID">Delete ID</label><input type="text" size="25" id="deleteID"/><br />'+
	'<button id="deleteAsset" onclick="deleteSingleAsset()">Delete Asset</button>'+
	'<div id="deleteAssetResponse">The result goes here</div>';
	
	return myvar;
}

function calculateDistance(lat1,lon1,lat2,lon2,unit){
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
	dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
												// where radius of the earth is 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
	if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
	return dist;
}
function closestAssetPoint(userlat, userlng) {
	// take the leaflet formdata layer
	// go through each point one by one
	// and measure the distance to Warren Street
	// for the closest point show the pop up of that point
	var minDistance = 100000000000;
	var closestPoint = 0;
	assetLayer.eachLayer(function(layer) {
	var distance = calculateDistance(userlat,
		userlng,layer.getLatLng().lat, layer.getLatLng().lng, 'K');
		if (distance < minDistance){
			minDistance = distance;
			closestPoint = layer.feature.properties.id;
		}
	});
	// for this to be a proximity alert, the minDistance must be 
	// closer than a given distance - you can check that here
	// using an if statement
	// show the popup for the closest point
	assetLayer.eachLayer(function(layer) {
		if (layer.feature.properties.id == closestPoint){
			layer.openPopup();
		}
	});
} 


function menu1(){
	alert("this function shows list of assets in best condition "+arguments.callee.name);
}
function menu2(){
	alert("this function shows daily reporting rates graph "+arguments.callee.name);
}
function menu3(){
	alert("this function shows help "+arguments.callee.name);
}
function menu4(){
	alert("this function shows user ranking "+arguments.callee.name);
}
function menu5(){
	alert("this function add layer - 5 closest assets "+arguments.callee.name);
}
function menu6(){
	alert("this function remove layer - 5 closest assets "+arguments.callee.name);
}
function menu7(){
	alert("this function add layer - last 5 reports, colour coded "+arguments.callee.name);
}
function menu8(){
	alert("this function remove layer - last 5 reports "+arguments.callee.name);
}
function menu9(){
	alert("this function add layer - not rated in the last 3 days "+arguments.callee.name);
}
function menu10(){
	alert("this function remove layer - not rated in the last 3 days "+arguments.callee.name);
}