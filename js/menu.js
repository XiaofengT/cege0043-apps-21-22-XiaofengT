function getUserRanking(){
	var getRankingURL = document.location.origin + "/api/userRanking/" + user_id;
	$.ajax({
		url: getRankingURL,
		crossDomain: true,
		success: function(result){
			alert("Your ranking of total number of condition reports in comparison to all users is: " + 
			result[0]["array_to_json"][0]["rank"] + ".");
		}
	}); 
}

var latlngString;
var fiveClosestAssetsLayer;
function fiveClosestAssetsLocation(){
	if(mymap.hasLayer(fiveClosestAssetsLayer)){
		mymap.removeLayer(fiveClosestAssetsLayer);
	}
	if(mymap.hasLayer(assetLayer)){
		mymap.removeLayer(assetLayer);
	}
	if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		latlngString = lat + "/" + lng;
		fiveClosestAssetsdata();
	});
	}else{
		alert("Geolocation is not supported by this browser.");
	}
}

function fiveClosestAssetsdata() {
	var fiveClosestURL = document.location.origin + '/api/fiveClosestAssets/' + latlngString;
	$.ajax({url: fiveClosestURL, 
			dataType: 'json', 
			async: false,
			success: function(result){
				var conditionMarker = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'yellow'
				});
				fiveClosestAssetsLayer = L.geoJson(
								result,{
								pointToLayer: function(feature, latlng){
									var popUpHTML = "Asset ID: " + feature.properties.id + "<br/>Asset Name: " + feature.properties.asset_name;
									return L.marker(latlng, {icon: conditionMarker}).bindPopup(popUpHTML);
								},
								}
								).addTo(mymap); 
			fiveClosestAssetsLayer.addData(result);
			mymap.fitBounds(fiveClosestAssetsLayer.getBounds());
			}
	});
}

function removeFiveClosestAssets() {
	if(mymap.hasLayer(fiveClosestAssetsLayer)){
		mymap.removeLayer(fiveClosestAssetsLayer);
	}
	if(!mymap.hasLayer(assetLayer)){
		setUpPointClick();
	}
}


var lastFiveConditionLayer;
function lastFiveConditionLocation(){
	if(mymap.hasLayer(lastFiveConditionLayer)){
		mymap.removeLayer(lastFiveConditionLayer);
	}
	if(mymap.hasLayer(assetLayer)){
		mymap.removeLayer(assetLayer);
	}
	lastFiveConditionData();
}

function lastFiveConditionData() {
	var lastFiveConditionURL = document.location.origin + '/api/lastFiveConditionReports/' + user_id;
	$.ajax({url: lastFiveConditionURL, 
			dataType: 'json', 
			async: false,
			success: function(result){
				var conditionMarker1 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'red'
				});
				var conditionMarker2 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'purple'
				});
				var conditionMarker3 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'pink'
				});
				var conditionMarker4 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'blue'
				});
				var conditionMarker5 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'green'
				});
				var conditionMarker6 = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'gray'
				});
				lastFiveConditionLayer = L.geoJson(
								result,{
								pointToLayer: function(feature, latlng){
									var popUpHTML = "<b>Asset Name: </b><br/>" + feature.properties.asset_name + "<br/>" +
									"<b>Latest condition situation: </b><br/>" + feature.properties.condition_description;
									if (feature.properties.condition_description == 'Element is in very good condition'){
										return L.marker(latlng, {icon: conditionMarker1}).bindPopup(popUpHTML);	
									}
									if (feature.properties.condition_description == 'Some aesthetic defects, needs minor repair'){
										return L.marker(latlng, {icon: conditionMarker2}).bindPopup(popUpHTML);
									}
									if (feature.properties.condition_description == 'Functional degradation of some parts, needs maintenance'){
										return L.marker(latlng, {icon: conditionMarker3}).bindPopup(popUpHTML);
									}
									if (feature.properties.condition_description == 'Not working and maintenance must be done as soon as reasonably possible'){
										return L.marker(latlng, {icon: conditionMarker4}).bindPopup(popUpHTML);
									}
									if (feature.properties.condition_description == 'Not working and needs immediate, urgent maintenance'){
										return L.marker(latlng, {icon: conditionMarker5}).bindPopup(popUpHTML);
									}
									else{
										return L.marker(latlng, {icon: conditionMarker6}).bindPopup(popUpHTML);
									}
								},
								}
								).addTo(mymap); 
			lastFiveConditionLayer.addData(result);
			mymap.fitBounds(lastFiveConditionLayer.getBounds());
			}
	});
}

function removeLastFiveCondition() {
	if(mymap.hasLayer(lastFiveConditionLayer)){
		mymap.removeLayer(lastFiveConditionLayer);
	}
	if(!mymap.hasLayer(assetLayer)){
		setUpPointClick();
	}
}

var missingConditionLayer;
function missingConditionLocation(){
	if(mymap.hasLayer(missingConditionLayer)){
		mymap.removeLayer(missingConditionLayer);
	}
	if(mymap.hasLayer(assetLayer)){
		mymap.removeLayer(assetLayer);
	}
	missingConditionData();
}

function missingConditionData() {
	var missingConditionURL = document.location.origin + '/api/conditionReportMissing/' + user_id;
	$.ajax({url: missingConditionURL, 
			dataType: 'json', 
			async: false,
			success: function(result){
				var conditionMarker = L.AwesomeMarkers.icon({
					icon: 'play',
					markerColor: 'gray'
				});
				missingConditionLayer = L.geoJson(
								result,{
								pointToLayer: function(feature, latlng){
									var popUpHTML = "<b>Asset Name: </b><br/>" + feature.properties.asset_name + "<br/>" +
									"<b>Missing condition situation.</b>";
									return L.marker(latlng, {icon: conditionMarker}).bindPopup(popUpHTML);	
								},
								}
								).addTo(mymap); 
			missingConditionLayer.addData(result);
			mymap.fitBounds(missingConditionLayer.getBounds());
			}
	});
}

function removeMissingCondition() {
	if(mymap.hasLayer(missingConditionLayer)){
		mymap.removeLayer(missingConditionLayer);
	}
	if(!mymap.hasLayer(assetLayer)){
		setUpPointClick();
	}
}

function closeGraph() {
	document.getElementById("graphWrapper").style.top = "-9999px";
}

function showReportGraph() {
	document.getElementById("graphWrapper").style.top="15%";
	var widtha = document.getElementById("graphWrapper").offsetWidth;
	var heighta = document.getElementById("graphWrapper").offsetHeight;
	// keep the existing HTML as there is a button that is needed
	document.getElementById("graphWrapper").innerHTML=document.getElementById("graphWrapper").innerHTML+'<div class="h-75 w-75"><svg width="'+widtha+'" height="'+heighta+'" id="svg1"></svg></div>'
	const svg = d3.select("#svg1"),
		margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom,
		x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
		y = d3.scaleLinear().rangeRound([height, 0]),
		g = svg.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`); 
	var baseComputerAddress = document.location.origin;
	var getReportString = "/api/dailyParticipationRates";
	var getReportURL = baseComputerAddress + getReportString;
	$.ajax({url: getReportURL, crossDomain: true, success: function(result){
		data = result[0]["array_to_json"];
		x.domain(data.map(data => data.day));
		y.domain([0, d3.max(data, data => data.reports_submitted)]);
		
		g.append("g")
			.attr("class", "axis axis-x")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(x));
		g.append("g")
			.attr("class", "axis axis-y")
			.call(d3.axisLeft(y).ticks(10).tickSize(8));
		g.append("rect")
			.attr("x",50)
			.attr("y",20)
			.attr("width", 15)
			.attr("height", 15)
			.style("fill", "#17becf");
		g.append("rect")
			.attr("x",50)
			.attr("y",50)
			.attr("width", 15)
			.attr("height", 15)
			.style("fill", "#1f77b4");
		g.append("text")
			.attr("x",70)
			.attr("y",30)
			.text("Report submitted")
			.style("font-size", "15px")
			.attr("alignment-baseline","middle");
		g.append("text")
			.attr("x",70)
			.attr("y",60)
			.text("Report not working")
			.style("font-size", "15px")
			.attr("alignment-baseline","middle");
		g.selectAll(".bar_submitted")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar_submitted")
			.attr("fill", "#17becf")
			.attr("x", d => x(d.day))
			.attr("y", d => y(d.reports_submitted))
			.attr("width", x.bandwidth())
			.attr("height", d => height - y(d.reports_submitted));
		g.selectAll(".bar_notworking")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar_notworking")
			.attr("fill", "#1f77b4")
			.attr("x", d => x(d.day))
			.attr("y", d => y(d.reports_not_working))
			.attr("width", x.bandwidth())
			.attr("height", d => height - y(d.reports_not_working));
		// .catch(err => {
		// svg.append("text")         
			// .attr("y", 20)
			// .attr("text-anchor", "left")  
			// .style("font-size", "20px") 
			// .style("font-weight", "bold")  
			// .text(`Couldn't open the data file: "${err}".`);
		// });
	}});
}


function bestConditionAssetData() {
	var bestConditionURL = document.location.origin + "/api/assetsInGreatCondition";
	$.ajax({url: bestConditionURL, success: function(result) {
		var datas = result[0]["array_to_json"];
		
		// generate a string for the table
		var tableHTML = "<table id='data3' class='display' style='width:100%'>";
		
		// add the column titles
        tableHTML += "<thead align><tr><td><h3>Asset ID</h3></td><td><h3>Asset Name</h3></td><td><h3>Installation Date</h3></td><td><h3>User ID</h3></td></tr></thead><tbody>";
		
		for (i=0; i<datas.length; i++){
			// add a new row
			tableHTML += "<tr>";
			
			// add a new column 
            tableHTML += "<td>";
			// add the id
            tableHTML += datas[i].id;
            // close the column
            tableHTML +="</td>";
			
			// add a new column 
            tableHTML += "<td>";
			// add the asset name
            tableHTML += datas[i].asset_name;
            // close the column
            tableHTML +="</td>";
			
			// add a new column 
            tableHTML += "<td>";
			// add the installation date
            tableHTML += datas[i].installation_date;
            // close the column
            tableHTML +="</td>";
			
			// add a new column 
            tableHTML += "<td>";
			// add the user id
            tableHTML += datas[i].user_id;
            // close the column
            tableHTML +="</td>";
			
			//close the row
            tableHTML +="</tr>";
		}// end the loop
		
		// close the table
		tableHTML +="<tbody></table>";

		// update the DIV
		document.getElementById("tablediv").innerHTML = tableHTML;
		
		createDataTable();

	}})
} 

function createDataTable(){
	document.getElementById("tablediv").style.top="15%";
	var widtha = document.getElementById("tablediv").offsetWidth;
	var heighta = document.getElementById("tablediv").offsetHeight;
	// keep the existing HTML as there is a button that is needed
	document.getElementById("tablediv").innerHTML=document.getElementById("tablediv").innerHTML+'<div class="h-75 w-75"><svg width="'+widtha+'" height="'+heighta+'" id="svg1"></svg></div>'
	
            dataTable = $('#data3').DataTable({
              paging: true,
              pageLength: 5,
              lengthChange: true,
                  lengthMenu: [5,8,10],
              scrollX: "100%",
              dom: 'Bfrtip',
                  buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
    pageResize: true,
              initComplete: function () {
                    this.api().columns().every( function () {
                      var column = this;
                      var select = $('<select><option value=""></option></select>')
                          .appendTo( $(column.header()))
                          .on( 'change', function () {
                              var val = $.fn.dataTable.util.escapeRegex(
                                  $(this).val()
                              );
                              column
                                  .search( val ? '^'+val+'$' : '', true, false )
                                  .draw();
                          }); // on change
                        column.data().unique().sort().each( function ( d, j ) {
                           select.append( '<option value="'+d+'">'+d+'</option>' )
                        }); // column data
                      }); // this.api
                } // init complete
                }); // data3 data table



                dataTable.draw();
          dataTable.columns.adjust().draw();
}

function closeTable() {
	document.getElementById("tablediv").style.top = "-9999px";
}