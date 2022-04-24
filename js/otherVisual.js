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

function showPieChart(){
	var baseComputerAddress = document.location.origin;
	var getAssetsString = "/api/geoJSONUserId/" + user_id;
	var getReportURL = baseComputerAddress + getAssetsString;
	var description = ["Element is in very good condition", 
                  "Some aesthetic defects, needs minor repair", 
                  "Functional degradation of some parts, needs maintenance", 
                  "Not working and maintenance must be done as soon as reasonably possible", 
                  "Not working and needs immediate, urgent maintenance", 
                  "Unknown"];
	var barColor = ["blue", "green", "yellow", "orage", "red", "gray"];
	var condition_count = [0,0,0,0,0,0];
	$.ajax({url: getReportURL, crossDomain: true, async: false, success: function(result){
		data = result[0]["features"];
		for (var i=0; i<data.length; i++){
			var condition_name = data[i]["properties"]["condition_description"];
			if(condition_name==description[0]){
				condition_count[0] += 1;
			}
			else if(condition_name==description[1]){
				condition_count[1] += 1;
			}
			else if(condition_name==description[2]){
				condition_count[2] += 1;
			}
			else if(condition_name==description[3]){
				condition_count[3] += 1;
			}
			else if(condition_name==description[4]){
				condition_count[4] += 1;
			}
			else if(condition_name==description[5]){
				condition_count[5] += 1;
			}
			else{
				condition_count[6] += 1;
			}
		}
		console.log(condition_count);
		console.log(description);
		new Chart(document.getElementById("percentageGraph"), {
			type: "doughnut",
			data: {
			  labels: description,
			  datasets: [{
				data: condition_count,
				backgroundColor: barColor,
				borderWidth: 1,
			  }]
			},
			options: {
			  maintainAspectRatio: false,
			  responsive: true,
			//  cutoutPercentage: 
			  legend: {
				display: true,
			  }
			}
      });
	}})
}