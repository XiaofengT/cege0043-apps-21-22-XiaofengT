var user_id;

function getUserId() {
	var baseComputerAddress = document.location.origin;
	var currentUserId = '/api/getUserId';
	var getIdURL = baseComputerAddress + currentUserId;
	$.ajax({url: getIdURL, crossDomain: true, async: false, success: function(result){
		 user_id = result["user_id"];
	}});
}

function loadVectorLayer(){
			// set the markers styles
			var conditionMarker1 = {
				markerColor: Cesium.Color.BLUE,
				strokeWidth: 3,
				markerSymbol: '1'
			};
			var conditionMarker2 = {
				markerColor: Cesium.Color.GREEN,
				strokeWidth: 3,
				markerSymbol: '2'
			};
			var conditionMarker3 = {
				markerColor: Cesium.Color.YELLOW,
				strokeWidth: 3,
				markerSymbol: '3'
			};
			var conditionMarker4 = {
				markerColor: Cesium.Color.ORANGE,
				strokeWidth: 3,
				markerSymbol: '4'
			};
			var conditionMarker5 = {
				markerColor: Cesium.Color.RED,
				strokeWidth: 3,
				markerSymbol: '5'
			};
			var conditionMarker6 = {
				markerColor: Cesium.Color.GRAY,
				strokeWidth: 3,
				markerSymbol: '6'
			};
            // get the data
            var layerURL = document.location.origin+"/api/geoJSONUserId/" + user_id;
            $.ajax({url: layerURL, crossDomain: true, success: function(result){
				result[0].features.map((item,idex,err)=>{
					var dataSource = new Cesium.GeoJsonDataSource("Assets");
					dataSource.clampToGround=false;
					dataSource._name = "Assets";
					viewer.dataSources.add(dataSource);
					
					if(item.properties.condition_description == "Element is in very good condition"){
						dataSource.load(item, conditionMarker1).then(function(dataSource){
							viewer.flyTo(dataSource);
						});
					}
					else if(item.properties.condition_description == "Some aesthetic defects, needs minor repair"){
						dataSource.load(item, conditionMarker2).then(function(dataSource){
							viewer.flyTo(dataSource);
						});
					}
					else if(item.properties.condition_description == "Functional degradation of some parts, needs maintenance"){
						dataSource.load(item, conditionMarker3).then(function(dataSource){
							viewer.flyTo(dataSource);
						});
					}
					else if(item.properties.condition_description == "Not working and maintenance must be done as soon as reasonably possible"){
						dataSource.load(item, conditionMarker4).then(function(dataSource){
							viewer.flyTo(dataSource);
						});
					}
					else if(item.properties.condition_description == "Not working and needs immediate, urgent maintenance"){
						dataSource.load(item, conditionMarker5).then(function(dataSource){
							viewer.flyTo(dataSource);
						});
					}
					else{
						dataSource.load(item, conditionMarker6).then(function(dataSource){
							viewer.flyTo(dataSource);
						});
					}
				})
			}})
}
