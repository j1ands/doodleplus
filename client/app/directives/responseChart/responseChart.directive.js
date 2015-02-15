'use strict';

angular.module('doodleplusApp')
.directive('responseChart', ['d3Service', '$stateParams', 'responseStatus', 'responseChartData', function(d3Service, $stateParams, responseStatus, responseChartData) {
	return {
		restrict: 'EA',
		scope: {
			onRectClick: '&',
			day: '=',
			dayNum: '='
		},
		link: function(scope, element, attrs) {
			d3Service.d3().then(function(d3) {

				var eventID = $stateParams.event_id;

				

				renderChart(scope.day);


				function renderChart (day){

					var hour = d3.time.format("%H:%M")

					var dayDataFormatted = day.allTimes.map(function(day){
						return hour(new Date(Number(day)));
					})

					var numResponses = day.allRespondents.length,
					responseData = [];

					day.times.forEach(function(time){
						for (var i=0; i<time.responses.length; i++){
							time.responses[i].index = i;
							time.responses[i].time = time.time;
							time.responses[i].allTimesIndex = day.allTimes.indexOf(time.responses[i].time);
							responseData.push(time.responses[i]);
						}
					})

					// var m = {top: 40, right: 20, bottom: 20, left: 60},
					// frameWidth = Number((window.innerWidth*.6).toFixed(2)),
					// frameHeight = Number((window.innerHeight*.7).toFixed(2)),
					// barSize = frameWidth/numResponses;
					var m = {top: 40, right: 60, bottom: 20, left: 60},
					frameWidth = parseInt(d3.select('#dayChart').style('width'))-m.left - m.right,
					frameHeight = parseInt(d3.select('#dayChart').style('height'))*9,
					barSize = frameWidth/numResponses;
					console.log('frameheight',frameHeight,frameWidth, 'numResponses', numResponses);

				var yRange = function(){
					var range = [];
					for (var i=0; i<day.allTimes.length; i++){
						range.push(i*frameHeight/day.allTimes.length);
					}
					return range;
				}
				
				var colorCalibration = ['#6CF2A4', '#F2B37C','#7CD1F2']

				var svg = d3.select('#chart-' + scope.dayNum).append("div")
				.attr("class","d3-container container")
				.selectAll("svg").data(d3.range(1))
				.enter().append("svg")
				.attr("id","viz")
				.attr("width",frameWidth + m.right +m.left)
				.attr("height",frameHeight + m.top + m.bottom)
				.append("g")
				.attr('transform', 'translate(' + m.left + ', ' + m.top + ')');		

				function viewBars (day) {
					/* add bars to chart */
					console.log('the day',day);
					var theDate = day.date;
					svg.append("g")
					.attr("class","chart")
					.selectAll("rect")
					.data(responseData)
					.enter()
					.append("rect")
					.attr("class", function(d){ return d.status + " rect" })
					.attr("UUID", function(d){ return d.UUID })
					.attr("time", function(d){ return d.time })
					.attr("date", theDate)
					.attr("x",function(d) { return d.index*barSize })
					.attr("y",function(d){ return frameHeight*d.allTimesIndex/day.allTimes.length })
					.attr("rx", 1)
					.attr("ry", 1)
					.attr("width",barSize - 1)
					.attr("height", frameHeight/day.allTimes.length - 1)
					.attr("username", function(d){ return d.username})
					.attr("status", function(d){ return d.status})
					.on('click', function(d){ 
						var responses = responseStatus.displayStatus.call(this, d.time,theDate);
						scope.onRectClick({ response: responses });
					})
					// .on('touch', function(d){ 
					// 	// d3.event.preventDefault();
					// 	var responses = responseStatus.displayStatus.call(this, d.time,theDate);
					// 	scope.onRectClick({ response: responses });
					// });;


				//axes, scale and grid/

				var axisWidth = 0,
				axisHeight = frameHeight,
				yAxisScale = d3.scale.ordinal()
				.domain(dayDataFormatted)
				.range(yRange().concat([""])),
				yAxis = d3.svg.axis()
				.scale(yAxisScale)
				.tickValues(dayDataFormatted)

				svg.append("g")
				.attr("class", "y left axis")
				.call(yAxis.orient("left"));	
			};

			viewBars(day);
		};
	});
}};
}]);

