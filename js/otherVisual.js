function rankTable(){
	var getTableURL = document.location.origin + "/api/topFiveScorers/";
	$.ajax({url: getTableURL, dataType: "json", success: function(result){
		var tableHTML = '<table class="table mb-0" style="width: 100%;height: 100%;"><tbody>';
		var rankingData = result[0]["array_to_json"];
		for (var i=0; i<rankingData.length; i++){
			tableHTML += '<tr style="white-space: nowrap;">'+"<td>No. "+rankingData[i].rank+"</td>";
			tableHTML += '<td style="white-space: nowrap;">User '+rankingData[i].user_id+"</td>";
			tableHTML += "</tr>";
		}
		tableHTML += "<tbody></table>";
		document.getElementById("rankingTable").innerHTML = tableHTML;
	}})
}