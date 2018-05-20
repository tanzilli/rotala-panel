var host = window.location.host;
var ws = new WebSocket('ws://'+host+'/ws');

var display1;
var display2;

ws.onopen = function(){
	console.log("Websocket opened");
};

// Gestione messaggi in arrivo da Python

ws.onmessage = function(ev){
	data=JSON.parse(ev.data);
	
	if (data.target=="display1") {
		display1.setValue(data.value.toString());
	}	

	if (data.target=="display2") {
		display2.setValue(data.value.toString());
	}	

	if (data.target=="abs_inc") {
		$("#abs_inc").text(data.value.toString());
	}	

	if (data.target=="mm_inch") {
		$("#mm_inch").text(data.value.toString());
	}	

};

ws.onclose = function(ev){
	console.log("Websocket closed");
};

ws.onerror = function(ev){
	console.log("Websocket error");
};

 
$(document).ready(function() {
	display1 = new SegmentDisplay("display1");

	display1.pattern         = "####";
	display1.displayAngle    = 6.5;
	display1.digitHeight     = 32;
	display1.digitWidth      = 17.5;
	display1.digitDistance   = 3.1;
	display1.segmentWidth    = 2.8;
	display1.segmentDistance = 0.4;
	display1.segmentCount    = 7;
	display1.cornerType      = 3;
	display1.colorOn         = "#ff330f";
	display1.colorOff        = "#4b1e05";

	display1.setValue("0");


	display2= new SegmentDisplay("display2");

	display2.pattern         = "####";
	display2.displayAngle    = 6.5;
	display2.digitHeight     = 32;
	display2.digitWidth      = 17.5;
	display2.digitDistance   = 3.1;
	display2.segmentWidth    = 2.8;
	display2.segmentDistance = 0.4;
	display2.segmentCount    = 7;
	display2.cornerType      = 3;
	display2.colorOn         = "#ff330f";
	display2.colorOff        = "#4b1e05";

	display2.setValue("0");

	$("#abs_inc").click(function(){
		data={"event":"click","id":"abs_inc", "value" :$("#abs_inc").text()};
		a=JSON.stringify(data);
		ws.send(a);
	});

	$("#mm_inch").click(function(){
		data={"event":"click","id": "mm_inch","value" : $("#mm_inch").text()};
		a=JSON.stringify(data);
		ws.send(a);
	}); 

});
