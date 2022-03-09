function closeGraph() {
	document.getElementById("graphWrapper").style.top = "-9999px";
}
function showGraph() {
	document.getElementById("graphWrapper").style.top="15%";
	console.log(document.getElementById("graphWrapper").style.top);
	var widtha = document.getElementById("graphWrapper").offsetWidth;
	var heighta = document.getElementById("graphWrapper").offsetHeight;
	console.log(widtha+" "+heighta);
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
	d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").then(data => {
		data = data.features;
		x.domain(data.map(d => d.properties.place));
		y.domain([0, d3.max(data, d => d.properties.mag)]);
	g.append("g")
		.attr("class", "axis axis-x")
		.attr("transform", `translate(0,${height})`)
		.call(d3.axisBottom(x));
	g.append("g")
		.attr("class", "axis axis-y")
		.call(d3.axisLeft(y).ticks(10).tickSize(8)); 
	g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", d => x(d.properties.place))
		.attr("y", d => y(d.properties.mag))
		.attr("width", x.bandwidth())
		.attr("height", d => height - y(d.properties.mag));
	})
	.catch(err => {
	svg.append("text")         
        .attr("y", 20)
        .attr("text-anchor", "left")  
        .style("font-size", "20px") 
        .style("font-weight", "bold")  
        .text(`Couldn't open the data file: "${err}".`);
	});
}