function checkCondition(data) {
	var asset_name = document.getElementById("asset_name").innerHTML;
	var installation_date = document.getElementById("installation_date").innerHTML;
	var user_id = document.getElementById("user_id").innerHTML;
	var assetID = document.getElementById("asset_"+data).innerHTML;
	var previousConditionValue = document.getElementById("previousConditionValue_"+data).value;
	var postString = "assetID="+assetID+"&Old_condition_value="+previousConditionValue+
	"&asset_name="+asset_name+"&installation_date="+installation_date+"&user_id="+user_id;
	
	try{
	if (document.getElementById(data+"_1").checked) {
		postString = postString + "&conditionvalue=1"
		conditionValue = 1;
	}
	if (document.getElementById(data+"_2").checked) {
		postString = postString + "&conditionvalue=2"
		conditionValue = 2;
	}
	if (document.getElementById(data+"_3").checked) {
		postString = postString + "&conditionvalue=3"
		conditionValue = 3;
	}
	if (document.getElementById(data+"_4").checked) {
		postString = postString + "&conditionvalue=4"
		conditionValue = 4;
	}
	if (document.getElementById(data+"_5").checked) {
		postString = postString + "&conditionvalue=5"
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
	catch(err){
		alert('Please select a condition description!')
	}
}

function conditionProcessData(postString) {
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