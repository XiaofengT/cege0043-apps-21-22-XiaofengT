function checkCondition(data) {
	var asset_name = document.getElementById("asset_name").innerHTML;
	var previousConditionValue = document.getElementById("previousConditionValue_"+data).innerHTML;
	var postString = "asset_name="+asset_name;
	
	if (document.getElementById(data+"_1").checked) {
		postString = postString + "&condition_description=Element is in very good condition"
		conditionValue = "Element is in very good condition";
	}
	else if (document.getElementById(data+"_2").checked) {
		postString = postString + "&condition_description=Some aesthetic defects, needs minor repair"
		conditionValue = "Some aesthetic defects, needs minor repair";
	}
	else if (document.getElementById(data+"_3").checked) {
		postString = postString + "&condition_description=Functional degradation of some parts, needs maintenance"
		conditionValue = "Functional degradation of some parts, needs maintenance";
	}
	else if (document.getElementById(data+"_4").checked) {
		postString = postString + "&condition_description=Not working and maintenance must be done as soon as reasonably possible"
		conditionValue = "Not working and maintenance must be done as soon as reasonably possible";
	}
	else if (document.getElementById(data+"_5").checked) {
		postString = postString + "&condition_description=Not working and needs immediate, urgent maintenance"
		conditionValue = "Not working and needs immediate, urgent maintenance";
	}
	else if (conditionValue == previousConditionValue) {
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
	var getNumURL = document.location.origin + "/api/userConditionReports/" + user_id;
	$.ajax({
		url: getNumURL,
		crossDomain: true,
		async: false,
		success: function(result){
			alert("You have submitted " + result[0]["array_to_json"][0]["num_reports"] + " condition reports.");
		}
	}); 
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
	    success: function(data){conditionDeleted(data);},
	    data: deleteString
});	
}
function conditionDeleted(data){
    document.getElementById("deleteConditionResponse").innerHTML = JSON.stringify(data);
}
