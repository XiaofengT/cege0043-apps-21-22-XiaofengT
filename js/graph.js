function closeGraph() {
	document.getElementById("graphWrapper").style.top = "-9999px";
}
function showGraph() {
	document.getElementById("graphWrapper").style.top = "300px";
	// the code to generate the graph goes here
	document.getElementById("graphWrapper").style.top="15%";
	console.log(document.getElementById("graphWrapper").style.top);
	var widtha = document.getElementById("graphWrapper").offsetWidth;
	var heighta = document.getElementById("graphWrapper").offsetHeight;
	console.log(widtha+" "+heighta);
	// keep the existing HTML as there is a button that is needed
	document.getElementById("graphWrapper").innerHTML=document.getElementById("graphWrapper").innerHTML+'<div class="h-75 w-75"><svg width="'+widtha+'" height="'+heighta+'" id="svg1"></svg></div>'

}