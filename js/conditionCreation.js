function saveConditionInformation(data) {
	var asset_name = "Asset";
	var installation_date = "2022-03-20";
	var user_id = "1";
	var assetID = document.getElementById("assetID").value;
	var previousConditionValue = document.getElementById("previousConditionValue").value;
	var postString = "assetID="+assetID+"&Old_condition_value="+previousConditionValue+
	"&asset_name="+asset_name+"&installation_date="+installation_date+"&user_id="+user_id;
	
	if (document.getElementById("1").checked) {
		postString = postString + "&conditionvalue=1"
		conditionValue = 1;
	}
	if (document.getElementById("2").checked) {
		postString = postString + "&conditionvalue=2"
		conditionValue = 2;
	}
	if (document.getElementById("3").checked) {
		postString = postString + "&conditionvalue=3"
		conditionValue = 3;
	}
	if (document.getElementById("4").checked) {
		postString = postString + "&conditionvalue=4"
		conditionValue = 4;
	}
	if (document.getElementById("5").checked) {
		postString = postString + "&conditionvalue=5"
		conditionValue = 5;
	}
	if (conditionValue == previousConditionValue) {
		alert("The condition value already exist!");
	}
	else{
		ConditionProcessData(postString);
		document.getElementById("previousConditionValue").value = conditionValue;
	}
}

function ConditionProcessData(postString) {
	alert(postString);

	var serviceUrl=  document.location.origin + "/api/testCRUD";
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