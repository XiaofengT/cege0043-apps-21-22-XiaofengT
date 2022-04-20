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