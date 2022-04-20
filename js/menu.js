function getUserRanking(){
	var getRankingURL = document.location.origin + "/api/userRanking/" + user_id;
	$.ajax({
		url: getRankingURL,
		crossDomain: true,
		success: function(result){
			alert("Your ranking of total number of condition reports in comparison to all users is: " + 
			result[0]["array_to_json"][0]["rank"] + ".");
		}
	}); 
}

var latlngString;
var fiveClosestAssetsLayer;
function fiveClosestAssetsLocation(){
	if(mymap.hasLayer(fiveClosestAssetsLayer)){
		mymap.removeLayer(fiveClosestAssetsLayer);
	}
	if(mymap.hasLayer(assetLayer)){
		mymap.removeLayer(assetLayer);
	}
	if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		latlngString = lat + "/" + lng;
		fiveClosestAssetsdata();
	});
	}else{
		alert("Geolocation is not supported by this browser.");
	}
}

function fiveClosestAssetsdata() {
	var fiveClosestURL = document.location.origin + '/api/fiveClosestAssets/' + latlngString;
	$.ajax({url: fiveClosestURL, 
			dataType: 'json', 
			async: false,
			success: function(result){
				var conditionMarker = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'yellow'
				});
				fiveClosestAssetsLayer = L.geoJson(
								result,{
								pointToLayer: function(feature, latlng){
									var popUpHTML = "Asset ID: " + feature.properties.id + "<br/>Asset Name: " + feature.properties.asset_name;
									return L.marker(latlng, {icon: conditionMarker}).bindPopup(popUpHTML);
								},
								}
								).addTo(mymap); 
			fiveClosestAssetsLayer.addData(result);
			mymap.fitBounds(fiveClosestAssetsLayer.getBounds());
			}
	});
}

function removeFiveClosestAssets() {
	if(mymap.hasLayer(fiveClosestAssetsLayer)){
		mymap.removeLayer(fiveClosestAssetsLayer);
	}
	if(!mymap.hasLayer(assetLayer)){
		setUpPointClick();
	}
}


var lastFiveConditionLayer;
function lastFiveConditionLocation(){
	if(mymap.hasLayer(lastFiveConditionLayer)){
		mymap.removeLayer(lastFiveConditionLayer);
	}
	if(mymap.hasLayer(assetLayer)){
		mymap.removeLayer(assetLayer);
	}
	lastFiveConditionData();
}

function lastFiveConditionData() {
	var lastFiveConditionURL = document.location.origin + '/api/lastFiveConditionReports/' + user_id;
	$.ajax({url: lastFiveConditionURL, 
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
				lastFiveConditionLayer = L.geoJson(
								result,{
								pointToLayer: function(feature, latlng){
									var popUpHTML = "<b>Asset Name: </b><br/>" + feature.properties.asset_name + "<br/>" +
									"<b>Latest condition situation: </b><br/>" + feature.properties.condition_description;
									if (feature.properties.condition_description == 'Element is in very good condition'){
										return L.marker(latlng, {icon: conditionMarker1}).bindPopup(popUpHTML);	
									}
									if (feature.properties.condition_description == 'Some aesthetic defects, needs minor repair'){
										return L.marker(latlng, {icon: conditionMarker2}).bindPopup(popUpHTML);
									}
									if (feature.properties.condition_description == 'Functional degradation of some parts, needs maintenance'){
										return L.marker(latlng, {icon: conditionMarker3}).bindPopup(popUpHTML);
									}
									if (feature.properties.condition_description == 'Not working and maintenance must be done as soon as reasonably possible'){
										return L.marker(latlng, {icon: conditionMarker4}).bindPopup(popUpHTML);
									}
									if (feature.properties.condition_description == 'Not working and needs immediate, urgent maintenance'){
										return L.marker(latlng, {icon: conditionMarker5}).bindPopup(popUpHTML);
									}
									else{
										return L.marker(latlng, {icon: conditionMarker6}).bindPopup(popUpHTML);
									}
								},
								}
								).addTo(mymap); 
			lastFiveConditionLayer.addData(result);
			mymap.fitBounds(lastFiveConditionLayer.getBounds());
			}
	});
}

function removeLastFiveCondition() {
	if(mymap.hasLayer(lastFiveConditionLayer)){
		mymap.removeLayer(lastFiveConditionLayer);
	}
	if(!mymap.hasLayer(assetLayer)){
		setUpPointClick();
	}
}

var missingConditionLayer;
function missingConditionLocation(){
	if(mymap.hasLayer(missingConditionLayer)){
		mymap.removeLayer(missingConditionLayer);
	}
	if(mymap.hasLayer(assetLayer)){
		mymap.removeLayer(assetLayer);
	}
	missingConditionData();
}

function missingConditionData() {
	var missingConditionURL = document.location.origin + '/api/conditionReportMissing/' + user_id;
	$.ajax({url: missingConditionURL, 
			dataType: 'json', 
			async: false,
			success: function(result){
				var conditionMarker = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'gray'
				});
				missingConditionLayer = L.geoJson(
								result,{
								pointToLayer: function(feature, latlng){
									var popUpHTML = "<b>Asset Name: </b><br/>" + feature.properties.asset_name + "<br/>" +
									"<b>Missing condition situation.</b>";
									return L.marker(latlng, {icon: conditionMarker}).bindPopup(popUpHTML);	
								},
								}
								).addTo(mymap); 
			missingConditionLayer.addData(result);
			mymap.fitBounds(missingConditionLayer.getBounds());
			}
	});
}

function removeMissingCondition() {
	if(mymap.hasLayer(missingConditionLayer)){
		mymap.removeLayer(missingConditionLayer);
	}
	if(!mymap.hasLayer(assetLayer)){
		setUpPointClick();
	}
}

function getDailyReportsRates() {
	var reportJSON;
	var baseComputerAddress = document.location.origin;
	var getReportString = "/api/dailyParticipationRates";
	var getReportURL = baseComputerAddress + getReportString;
	$.ajax({url: getReportURL, crossDomain: true, async: false, success: function(result){
		 reportJSON = result;
	}});
	return reportJSON;
}