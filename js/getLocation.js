function getLocation(){
	alert('getting location');
	navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position){
	document.getElementById('showLocation').innerHTML="Latitude:"+position.coords.latitude+"<br>Longitude:"+position.coords.longitude;
}