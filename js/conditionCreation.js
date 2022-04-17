function checkCondition(data) {
	var asset_name = document.getElementById("asset_name").innerHTML;
	//var installation_date = document.getElementById("installation_date").innerHTML;
	//var user_id = document.getElementById("user_id").innerHTML;
	var assetID = document.getElementById("asset_"+data).innerHTML;
	var previousConditionValue = document.getElementById("previousConditionValue_"+data).value;
	var postString = "asset_name="+asset_name;
	
	if (document.getElementById(data+"_1").checked) {
		postString = postString + "&condition_description=Element is in very good condition"
		conditionValue = 1;
	}
	if (document.getElementById(data+"_2").checked) {
		postString = postString + "&condition_description=Some aesthetic defects, needs minor repair"
		conditionValue = 2;
	}
	if (document.getElementById(data+"_3").checked) {
		postString = postString + "&condition_description=Functional degradation of some parts, needs maintenance"
		conditionValue = 3;
	}
	if (document.getElementById(data+"_4").checked) {
		postString = postString + "&condition_description=Not working and maintenance must be done as soon as reasonably possible"
		conditionValue = 4;
	}
	if (document.getElementById(data+"_5").checked) {
		postString = postString + "&condition_description=Not working and needs immediate, urgent maintenance"
		conditionValue = 5;
	}
	if (conditionValue == previousConditionValue) {
		alert("The condition value already exist!");
	}
	else{
		conditionProcessData(postString);
		document.getElementById("previousConditionValue_"+data).value = conditionValue;
	}
}

function conditionProcessData(postString) {
	alert(postString);

	var serviceUrl=  document.location.origin + "/api/insertConditionInformation";
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){console.log(data); conditionDataUploaded(data);}

}); 
}
// create the code to process the response from the data server
function conditionDataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("conditionResult").innerHTML = JSON.stringify(data);
}

function deleteSingleCondition() {
	var deleteID = document.getElementById("deleteID").value;
	console.log(deleteID);
	var deleteString = "id="+deleteID;
	var serviceUrl= document.location.origin + "/api/deleteConditionReport";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){dataDeleted(data);},
	    data: deleteString
});	
}
function dataDeleted(data){
    document.getElementById("deleteConditionResponse").innerHTML = JSON.stringify(data);
}
