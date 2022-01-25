var ethernetLayer;	

function getEthernetData() {
 var url = document.location.origin + "/app/data/ethernet.geojson";
 $.ajax({url: url, dataType: 'json' ,success: function(result){
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
	 console.log(layer);
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

