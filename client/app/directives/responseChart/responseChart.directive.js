'use strict';

angular.module('doodleplusApp')
.directive('responseChart', ['d3Service', '$stateParams', 'storeEvent', 'Time', function(d3Service, $stateParams, storeEvent, Time) {
	return {
		restrict: 'EA',
		scope: {
			onRectClick: '&'
		},
		link: function(scope, element, attrs) {
			d3Service.d3().then(function(d3) {

				// var data = [{"start":"2015-08-18 18:00:00","stop":"2015-08-18 20:00:00", "user": "Biff", "status": "Yes"},{"start":"2015-08-21 06:00:00","stop":"2015-08-21 10:00:00", "user": "Ringo", "status": "If Need Be"},{"start":"2015-08-23 18:00:00","stop":"2015-08-23 23:00:00", "user": "Prince", "status": "Maybe"},{"start":"2015-08-23 20:21:00","stop":"2015-08-23 21:21:00", "user": "Charles Barkley", "status": "Yes"},{"start":"2015-08-25 17:01:00","stop":"2015-08-25 22:01:00", "user": "Abe Vigoda", "status": "If Need Be"},{"start":"2015-08-26 17:23:00","stop":"2015-08-26 23:23:00", "user": "Janet Reno", "status": "Unable"},{"start":"2015-08-26 17:52:00","stop":"2015-08-26 23:52:00", "user": "George Costanza", "status": "Yes"},{"start":"2015-08-26 21:01:00","stop":"2015-08-26 23:01:00", "user": "50 Cent", "status": "Unable"},{"start":"2015-08-27 11:23:00","stop":"2015-08-27 23:23:00", "user": "Vladimir Putin", "status": "If Need Be"}];
				
// renderChart(data);

				var data = [];


				var eventId = $stateParams.event_id;

					storeEvent.getEvent(eventId, function() {
						console.log(storeEvent.event)
						storeEvent.event.Times.forEach(function(time){			
							var timeData = [];
							for (var i=0; i<time.Responses.length; i++){
								timeData.push({
									eventId: eventId,
									timeId: time.Responses[i].TimeId,
									UUID: time.Responses[i].UUID,
									username: time.Responses[i].username,
									status: time.Responses[i].status
								})
							}
							data = data.concat(timeData)
						});
						console.log(data)
						renderChart(data);									
					});



			function renderChart (data){

				var responses = [];

				var first = d3.time.day.floor( new Date(data[0].start)),
				last = d3.time.day.ceil( new Date(data[data.length-1].stop)),
				dRange = [d3.min(data,function(d){
					return d3.time.day.floor(new Date(d.start))}), 
				d3.max(data,function(d){
					return d3.time.day.ceil(new Date(d.stop))})];


				var m = {top: 40, right: 20, bottom: 20, left: 60},
				width = window.innerWidth*.5,
				height = window.innerHeight*.6,
				numDays = ((dRange[1]-dRange[0])/(24*60*60*1000)),
				barSize = width/numDays;
				console.log("GOT HERE")

				var day = d3.time.format("%w"),
				week = d3.time.format("%U"),
				hour = d3.time.format("%X"),
				format = d3.time.format("%Y-%m-%d %X"),
				now = new Date();
				
				var svg = d3.select("body").append("div")
				.attr("class","d3-container container")
				.selectAll("svg").data(d3.range(1))
				.enter().append("svg")
				.attr("id","viz")
				.attr("width",width + m.right +m.left)
				.attr("height",height + m.top + m.bottom)
				.append("g")
				.attr('transform', 'translate(' + m.left + ', ' + m.top + ')');
				
				function viewBars (data) {		
					/* set up scales */
					var x = d3.time.scale()		
					.domain(dRange)
					.range([0, width]);
					
					var y =d3.time.scale()
					.domain([0,24])
					.range([0, height]);

			var tfh = d3.time.scale()	//TwentyFourHour scale
			.domain([d3.time.hour(new Date(2014,0,1,0,0,0)),
				d3.time.hour(new Date(2014,0,2,0,0,0)),])
			.range([0,height]);
			
			/* add bars to chart */
			svg.append("g")
			.attr("class","chart")
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("class","times bar")
			.attr("x",function(d) { return x(d3.time.day.floor(new Date(d.start)))}
				)
			.attr("y",function(d){
					var h = hour(new Date(d.start)).split(":"), //changes datum from string, to proper Date Object, back to hour string and splits
						yh = parseFloat(h[0])+parseFloat(h[1]/60); //time (hour and minute) as decimal
						return y(yh);
						;})
			.attr("width",barSize)
			.attr("height",function(d){
				var hstart = new Date(d.start),
				hstop = new Date(d.stop);
					return y((hstop-hstart)/3600000);	//date operations return a timestamp in miliseconds, divide to convert to hours
				})
			.attr("rx",3)
			.attr("ry",3)
			.attr("user", function(d){ return d.user})
			.attr("status", function(d){ return d.status})
			.on('click', function(d){ 
				// var overlap = d3.select(this).getIntersectionList("rect", null) 
				$("rect").each(function() {
					var mouse = d3.mouse(this)
					var x = Number(this.getAttribute('x'))
					var y = Number(this.getAttribute('y'))
					var user = this.getAttribute('user')
					var status = this.getAttribute('status')
					var width = Number(this.getAttribute('width'))
					var height = Number(this.getAttribute('height'))
					
					if(mouse[0] > x && mouse[0] < x + width && mouse[1] > y && mouse[1] < y + height){
						responses.push({user: user, status: status});
						console.log(user + '' + status)
						
					}
				});
				scope.onRectClick({ response: responses });
				responses = [];
			});


			
			
			/*add axes and grid*/
			var yAxis = d3.svg.axis()
			.scale(tfh)
			.tickFormat(d3.time.format("%H:%M"));
			var yGrid = d3.svg.axis()
			.scale(tfh)
			.orient("left")
			.ticks(12);
			var xAxis = d3.svg.axis()
			.scale(x)
			.tickFormat(d3.time.format("%m/%d"));
			
			svg.append("g")
			.attr("class", "y left axis")
			.call(yAxis.orient("left"));	
			svg.append("g")
			.attr("class","y grid")
			.call(yGrid
				.tickSize(height, 0, 0)
				.tickFormat(""));
			svg.append("g")
			.attr("class","x top axis")
			.call(xAxis.orient("top"));

		};
		viewBars(data);
	};
	});
}};
}]);