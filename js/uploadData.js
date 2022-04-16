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
var mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
function setMapClickEvent() {
	// get the window width
	width = $(window).width();
	// we use the bootstrap Medium and Large options for the asset location capture
	// and the small and XS options for the condition option
	// see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
	if (width < 992) {//the condition capture – 992px is defined as 'medium' by bootstrap
		// cancel the map onclick event using off ..
		mymap.off('click',onMapClick)
		// set up a point with click functionality
		setUpPointClick(); 
	}
	else { // the asset creation page
		// remove the map point if it exists
		if (mapPoint){
			mymap.removeLayer(mapPoint);
		}
		// the on click functionality of the MAP should pop up a blank asset creation form
		mymap.on('click', onMapClick);
	}
}

function getUserIdLoadMap() {
	var baseComputerAddress = document.location.origin;
	var currentUserId = '/api/getUserId';
	var getIdURL = baseComputerAddress + currentUserId;
	$.ajax({url: getIdURL, crossDomain: true, success: function(result){
		 user_id = result["user_id"];
		 loadLeafletMap()
	}});
}

function setUpPointClick() {
	// create a geoJSON feature (in your assignment code this will be replaced
	// by an AJAX call to load the asset points on the map
	// and add it to the map and zoom to that location
	// use the mapPoint variable so that we can remove this point layer on
	// the on click functionality of the POINT should pop up partially populated condition form so that the user can select the condition they require
	var popUpHTML = getPopupHTML;
	var baseComputerAddress = document.location.origin;
	var currentUserId = user_id;
	console.log(currentUserId)
	var dataAddress = '/geoJSONUserId/'+currentUserId;
	var assetURL = baseComputerAddress + dataAddress;
	$.ajax({url: assetURL, dataType: 'json', success: function(result){
		var assetLayer = L.geoJson(result).addTo(mymap).bindPopup(popUpHTML); 
		assetLayer.addData(result);
	}})
	mymap.setView([51.522449,-0.13263], 12)
	console.log(popUpHTML);
}

function getPopupHTML(){
	var assetID = "1272"
	var asset_name = "Asset";
	var installation_date = "2022-03-20";
	var user_id = "1";
	var previousConditionValue = "None"
	var htmlString	= "<div id='asset_name'>"+asset_name+"</div><br>";
	htmlString = htmlString +"<div id='installation_date'>"+ installation_date + "</div><br>";
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
	'<div id="conditionResult">The result goes here</div>';
	return htmlString;
}

function onMapClick(e) {
	var formHTML = basicFormHtml();
	popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML).openOn(mymap);
}
function basicFormHtml() {
	var user_id = "1";
	var myvar = '<label for="asset_name">Asset name</label><input type="text" size="25" id="asset_name"/><br />'+
	'<label for="installation_date">Installation date</label><input type="date" id="installation_date"/><br />'+
	'<label for="latitude">Latitude</label><input type="text" size="25" id="latitude"/><br />'+
	'<label for="longitude">Longitude</label><input type="text" size="25" id="longitude"/><br />'+
	"<div id='user_id' hidden>"+user_id+"</div>"+
	''+
	'<p>Click here to save your asset</p>'+
	'<button id="saveAsset" onclick="saveNewAsset()">Save new asset</button>'+
	'<br />'+
	'<br />'+
	'<div id="responseDIV">The result goes here</div>'+
	'<br />'+
	'<hr>'+
	''+
	'<label for="deleteID">Delete ID</label><input type="text" size="25" id="deleteID"/><br />'+
	'<button id="deleteAsset" onclick="deleteSingleAsset()">Delete Record</button>'+
	'<div id="deleteAssetResponse">The result goes here</div>';
	
	return myvar;
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