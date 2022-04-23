function rankTable(){
	var getTableURL = document.location.origin + "/api/topFiveScorers/";
	$.ajax({url: getTableURL, dataType: "json", success: function(result){
		var tableHTML = '<table><tbody>';
		var rankingData = result[0]["array_to_json"];
		for (var i=0; i<rankingData.length; i++){
			tableHTML += "<tr>"+"<td>No. "+rankingData[i].rank+"</td>";
			tableHTML += "<td>User "+rankingData[i].user_id+"</td>";
			tableHTML += "</tr>";
		}
		tableHTML += "<tbody></table>";
		document.getElementById("rankingTable").innerHTML = tableHTML;
	}})
}