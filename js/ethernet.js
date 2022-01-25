var ethernetLayer;	

function getEthernetData() {
 var url = document.location.origin + "/app/data/ethernet.geojson";
 $.ajax({url: url, crossDomain: true,success: function(result){
 console.log(result); // check that the data is correct
 var testMarkerGreen = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'green'
 });
 var testMarkerPink = L.AwesomeMarkers.icon({
 icon: 'play', 
 markerColor: 'pink'
}); 
 // add the JSON layer onto the map - it will appear using the default icons
 // load the geoJSON layer
 ethernetLayer = L.geoJson(result).addTo(mymap); 
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

