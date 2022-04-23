function showAssetsGraph(){
	var baseComputerAddress = document.location.origin;
	var getAssetsString = "/api/geoJSONUserId/" + user_id;
	var getReportURL = baseComputerAddress + getAssetsString;
	$.ajax({url: getReportURL, crossDomain: true, success: function(result){
		data = result[0]["features"];
		var asset_names = [];
		var condition_values = [];
		var condition_dictionary = {
			"Element is in very good condition": 1, 
			"Some aesthetic defects, needs minor repair":2, 
			"Functional degradation of some parts, needs maintenance":3, 
			"Not working and maintenance must be done as soon as reasonably possible":4, 
			"Not working and needs immediate, urgent maintenance":5, 
			"Unknown": 0
		};
		var chartData = [];
		for (var i=0; i<data.length; i++){
			asset_names[i] = data[i]["properties"]["asset_name"];
			condition_values[i] = condition_dictionary[data[i]["properties"]["condition_description"]];
			//chartData[i] = [asset_names[i], condition_values[i]];
		}
		new Chart(document.getElementById("graphWrapper"), {
			type: "bar",
			data: {
			  labels: asset_names,
			  datasets: [{
				label: "Condition Value",
				borderColor: "blue",
				backgroundColor: "rgba(0,0,255,0.4)",
				borderWidth: 1,
				data: condition_values,
				barPercentage: .75,
				categoryPercentage: 1
			  }]
			},
			options: {
			  maintainAspectRatio: false,
			  responsive: true,
			  legend: {
				display: false,
			  },
			  scales: {
				yAxes: [{
				  gridLines: {
					display: true
				  },
				  stacked: false,
				  ticks: {
					stepSize: 1
				  }
				}],
				xAxes: [{
				  stacked: false,
				  gridLines: {
					display: false
				  }
				}]
			  }
			}
      });
	}})
}