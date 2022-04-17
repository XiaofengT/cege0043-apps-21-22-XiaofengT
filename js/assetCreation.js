function saveNewAsset() {
	
	var asset_name = document.getElementById("asset_name").value;
	var installation_date = document.getElementById("installation_date").value;
	var postString = "asset_name="+asset_name +"&installation_date="+installation_date;
	
	// now get the geometry values
	var latitude = document.getElementById("latitude").innerHTML;
	var longitude = document.getElementById("longitude").innerHTML;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
	var user_id = document.getElementById("user_id").innerHTML;
	postString = postString + "&user_id=" + user_id;
	
	assetProcessData(postString);

}

function deleteSingleAsset() {
	var deleteID = document.getElementById("deleteID").value;
	console.log(deleteID);
	var deleteString = "asset_id="+deleteID;
	var serviceUrl= document.location.origin + "/api/deleteAsset";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){dataDeleted(data);},
	    data: deleteString
});	
}
function dataDeleted(data){
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
    success: function(data){console.log(data); assetDataUploaded(data);}

}); 
}
// create the code to process the response from the data server
function assetDataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("responseDIV").innerHTML = JSON.stringify(data);
}


