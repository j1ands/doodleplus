'use strict';

angular.module('doodleplusApp')
.directive('simpleLineChart', ['d3Service', function(d3Service) {
	return {
		restrict: 'EA',
		scope: {},
		link: function(scope, element, attrs) {
			d3Service.d3().then(function(d3) {

				var data = [{"start":"2015-08-18 18:00:00","stop":"2015-08-18 20:00:00"},{"start":"2015-08-21 06:00:00","stop":"2015-08-21 10:00:00"},{"start":"2015-08-23 18:00:00","stop":"2015-08-23 23:00:00"},{"start":"2015-08-23 20:21:00","stop":"2015-08-23 21:21:00"},{"start":"2015-08-25 17:01:00","stop":"2015-08-25 22:01:00"},{"start":"2015-08-26 17:23:00","stop":"2015-08-26 23:23:00"},{"start":"2015-08-26 17:52:00","stop":"2015-08-26 23:52:00"},{"start":"2015-08-26 21:01:00","stop":"2015-08-26 23:01:00"},{"start":"2015-08-27 11:23:00","stop":"2015-08-27 23:23:00"},{"start":"2015-08-29 20:21:00","stop":"2015-08-29 21:21:00"},{"start":"2015-08-31 20:21:00","stop":"2015-08-31 21:21:00"}];
				
				var first = d3.time.day.floor( new Date(data[0].start)),
				last = d3.time.day.ceil( new Date(data[data.length-1].stop)),
				dRange = [d3.min(data,function(d){
					return d3.time.day.floor(new Date(d.start))}), 
				d3.max(data,function(d){
					return d3.time.day.ceil(new Date(d.stop))})];
				
				var m = {top: 40, right: 20, bottom: 20, left: 60},
				width = window.innerWidth*.8,
				barSize = 25,
				height = ((dRange[1]-dRange[0])/(24*60*60*1000))* barSize;

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
					.domain([0,24])
					.range([0, width]);
					
					var y =d3.time.scale()
					.domain(dRange)
					.range([0, height]);

			var tfh = d3.time.scale()	//TwentyFourHour scale
			.domain([d3.time.hour(new Date(2014,0,1,0,0,0)),
				d3.time.hour(new Date(2014,0,2,0,0,0)),])
			.range([0,width]);
			
			/* add bars to chart */
			svg.append("g")
			.attr("class","chart")
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("class","times bar")
			.attr("x",function(d){
					var h = hour(new Date(d.start)).split(":"), //changes datum from string, to proper Date Object, back to hour string and splits
						xh = parseFloat(h[0])+parseFloat(h[1]/60); //time (hour and minute) as decimal
						return x(xh);
						;})
			.attr("y",function(d) { return y(d3.time.day.floor(new Date(d.start)))}
				)
			.attr("width",function(d){
				var hstart = new Date(d.start),
				hstop = new Date(d.stop);
					return x((hstop-hstart)/3600000);	//date operations return a timestamp in miliseconds, divide to convert to hours
				})
			.attr("height",barSize)
			.attr("rx",3)
			.attr("ry",3)
			.append("svg:title")
			.text(function(d){return(d.start)+' - '+(d.stop);})
			.datum(function(d){return Date.parse(d)})
			;
			
			/*add axes and grid*/
			var xAxis = d3.svg.axis()
			.scale(tfh)
			.tickFormat(d3.time.format("%H:%M"));
			var xGrid = d3.svg.axis()
			.scale(tfh)
			.orient("bottom")
			.ticks(12);
			var yAxis = d3.svg.axis()
			.scale(y)
			.tickFormat(d3.time.format("%m/%d"));
			
			svg.append("g")
			.attr("class", "x top axis")
			.call(xAxis.orient("top"));	
			svg.append("g")
			.attr("class","x grid")
			.call(xGrid
				.tickSize(height, 0, 0)
				.tickFormat(""));
			svg.append("g")
			.attr("class","y left axis")
			.call(yAxis.orient("left"));
		};
		viewBars(data);
	});
}};
}]);