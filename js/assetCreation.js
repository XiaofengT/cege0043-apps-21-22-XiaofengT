function saveNewAsset() {
	
	var asset_name = document.getElementById("asset_name").value;
	var installation_date = document.getElementById("installation_date").value;
	if (asset_name != '' && installation_date != '') {
		var postString = "asset_name="+asset_name +"&installation_date="+installation_date;
		// now get the geometry values
		var latitude = document.getElementById("latitude").innerHTML;
		var longitude = document.getElementById("longitude").innerHTML;
		postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
		var user_id = document.getElementById("user_id").innerHTML;
		postString = postString + "&user_id=" + user_id;
		
		assetProcessData(postString);
	}
	else{
		alert("Please fill all the blanks!");
	}

}

function deleteSingleAsset() {
	var deleteID = document.getElementById("deleteID").value;
	var deleteString = "id="+deleteID;
	var serviceUrl= document.location.origin + "/api/deleteAsset";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){assetDeleted(data);},
	    data: deleteString
});	
}
function assetDeleted(data){
    document.getElementById("deleteAssetResponse").innerHTML = JSON.stringify(data);
}

function assetProcessData(postString) {
	alert(postString);

	var serviceUrl=  document.location.origin + "/api/insertAssetPoint";
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){assetDataUploaded(data);}

}); 
}
// create the code to process the response from the data server
function assetDataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("responseDIV").innerHTML = JSON.stringify(data);
	setMapClickEvent();
}


