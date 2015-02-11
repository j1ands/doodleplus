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

				var days;
				


				var eventID = $stateParams.event_id;

				var allTimes = [];

				storeEvent.getEvent(eventID, function() {
					console.log(storeEvent.event)
					var event = storeEvent.event;
					var times = storeEvent.event.times;
					Time.organizeByDay(times);
					days = Time.days;
					days.forEach(function(day){
						var respondents = [];
						var allTimes = [];
						day.times.sort(function(a,b){
							var timeA = a.time;
							var timeB = b.time;
							return (timeA < timeB) ? -1 : (timeA > timeB) ? 1 : 0;
						});

						day.times.forEach(function(time){
							for (var i=0; i<time.responses.length; i++){
								respondents.push(time.responses[i].UUID);
								allTimes.push(time.time);
							};		
							time.responses.sort(function(a,b){
								var textA = a.status.toUpperCase();
								var textB = b.status.toUpperCase();
								return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
							});
						})
						day.respondents = respondents.reduce(function(accum, current) {
							if (accum.indexOf(current) < 0) {
								accum.push(current);
							}
							return accum;
						}, []);
						day.allTimes = allTimes.reduce(function(accum, current) {
							if (accum.indexOf(current) < 0) {
								accum.push(current);
							}
							return accum;
						}, []);

					})


					renderChart(days[0])

			});


			function renderChart (dayData){


				var hour = d3.time.format("%H:%M")
				
				var dayDataFormatted = dayData.allTimes.map(function(day){
					return hour(new Date(Number(day)));
				})




				var numResponses = dayData.respondents.length,
				
				responseData = [];


				dayData.times.forEach(function(time){
					for (var i=0; i<time.responses.length; i++){
						time.responses[i].index = i;
						time.responses[i].time = time.time;
						time.responses[i].allTimesIndex = dayData.allTimes.indexOf(time.responses[i].time);
						responseData.push(time.responses[i]);
					}
				})


				var m = {top: 40, right: 20, bottom: 20, left: 60},
				frameWidth = Number((window.innerWidth*.5).toFixed(2)),
				frameHeight = Number((window.innerHeight*.6).toFixed(2)),
				// frameWidth = 800,
				// frameHeight = 800,
				barSize = frameWidth/8
				// barSize = frameWidth/dayData.respondents.length;

				var yRange = function(){
					var range = [];
					for (var i=0; i<dayData.allTimes.length; i++){
						range.push(i*frameHeight/dayData.allTimes.length);
					}
					return range;
				}
				
				var colorCalibration = ['#6CF2A4', '#F2B37C','#7CD1F2']


				var svg = d3.select('#chart').append("div")
				// .attr("class","d3-container container")
				.selectAll("svg").data(d3.range(1))
				.enter().append("svg")
				.attr("id","viz")
				.attr("width",frameWidth + m.right +m.left)
				.attr("height",frameHeight + m.top + m.bottom)
				.append("g")
				.attr('transform', 'translate(' + m.left + ', ' + m.top + ')');



				 function initCalibration(){
				    d3.select('[role="calibration"]').select('svg')
				      .selectAll('rect').data(colorCalibration).enter()
				    .append('rect')
				      .attr('width',20)
				      .attr('height',20)
				      .attr('x',function(d,i){
				        return i*20;
				      })
				      .attr('fill',function(d){
				        return d;
				      });
				  }

				initCalibration();

				function viewBars (data) {
					

					/* add bars to chart */
					svg.append("g")
					.attr("class","chart")
					.selectAll("rect")
					.data(responseData)
					.enter()
					.append("rect")
					.attr("class", function(d){ return d.status + " rect" })
					.attr("x",function(d) { return d.index*barSize })
					.attr("y",function(d){ return frameHeight*d.allTimesIndex/dayData.allTimes.length })
					.attr("width",barSize)
					.attr("height", frameHeight/dayData.allTimes.length - 1.5)
					// .attr("rx", 1)
					// .attr("ry", 1)
					.attr("username", function(d){ return d.username})
					.attr("status", function(d){ return d.status})
					.on('click', function(d){ 
						var responses = [];
						$("rect").each(function() {
							var mouse = d3.mouse(this)
							var x = Number(this.getAttribute('x'))
							var y = Number(this.getAttribute('y'))
							var username = this.getAttribute('username')
							var status = this.getAttribute('status')
							var width = Number(this.getAttribute('width'))
							var height = Number(this.getAttribute('height'))

							// if(mouse[0] > x && mouse[0] < x + width && mouse[1] > y && mouse[1] < y + height){
							if(mouse[1] > y && mouse[1] < y + height){
								responses.push({username: username, status: status});
								console.log(username + '' + status)
							}
						});
						scope.onRectClick({ response: responses });
					});

				//axes, scale and grid/

				var axisWidth = 0,
				axisHeight = frameHeight,
				yAxisScale = d3.scale.ordinal()
					.domain(dayDataFormatted)
					.range(yRange().concat([""])),
				yAxis = d3.svg.axis()
					.scale(yAxisScale)
					.tickValues(dayDataFormatted)
				// yGrid = d3.svg.axis()
				// 	.scale(yAxisScale)
				// 	.orient("left")
				// 	.ticks(dayDataFormatted.length);


				svg.append("g")
					.attr("class", "y left axis")
					.call(yAxis.orient("left"));	

				// svg.append("g")
				// 	.attr("class","y grid")
				// 	.call(yGrid
				// 		.tickSize(0, 0)
				// 		.tickFormat(""));


			};

			viewBars(dayData);
		};



		//then	
	});
//link func
}};

}]);