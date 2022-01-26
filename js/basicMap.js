// load the map
	var mymap = L.map('mapid').setView([51.505, -0.09], 9);
	// create a custom popup as a global variable
	var popup = L.popup();
	 // create an event detector to wait for the user's click event and then use the popup to show them where they clicked
	 // note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
	 function onMapClick(e) {
	 popup
	 .setLatLng(e.latlng)
	 .setContent("You clicked the map at " + e.latlng.toString())
	 .openOn(mymap);
	 }
	// load the tiles
	function loadLeafletMap(){
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
maxZoom: 18,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1

	}).addTo(mymap);
	
		// now call the code to add the markers
		addBasicMarkers();
		// now add the click event detector to the map
		mymap.on('click', onMapClick);
	}//end code to add the leaflet map
	
	// add a point
	function addBasicMarkers(){
	
	var testMarkerPink = L.AwesomeMarkers.icon({
	 icon: 'play',
	 markerColor: 'pink'
	});
	
	// create a geoJSON feature -
	 var geojsonFeature = {
	 "type": "Feature",
	 "properties": {
	 "name": "London",
	 "popupContent": "This is where UCL is based. We have on campus and off campus activity."
	 },
	 "geometry": {
	 "type": "Point",
	 "coordinates": [-0.132986, 51.524184]
	 }
	};
	 // and add it to the map
	L.geoJSON(geojsonFeature, {
	 pointToLayer: function (feature, latlng) {
	 return L.marker(latlng, {icon:testMarkerPink});
	 }
	 }).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+""+geojsonFeature.properties.popupContent+"<b>");
	L.circle([51.508, -0.11], 5000, {
			color: 'green',
			fillColor: '#f03',
			fillOpacity: 0.8
	 }).addTo(mymap).bindPopup("I am a circle.");
	 
	 // add a polygon with 3 end points (i.e. a triangle)
	 var myPolygon = L.polygon([
			[51.709, -0.10],
			[51.703, 0.07],
			[51.22, 0.07],
			[51.22, -0.057]
	 ],{
			color: 'orange',
			fillColor: '#f03',
			fillOpacity: 0.5
	 }).addTo(mymap).bindPopup("I am a polygon in 2022.");
	}// end code to add the basic markers