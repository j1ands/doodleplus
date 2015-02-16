'use strict';

angular.module('doodleplusApp')
.directive('indivStatusChart', ['d3Service', function(d3Service) {
	return {
		restrict: 'EA',
		scope: {
			selected: '='
		},
		link: function(scope, element, attrs) {
			scope.$watch("selected", function(newValue, oldValue){
				console.log("these are the new and old values", newValue, oldValue)
			// if(newValue !== oldValue){
			d3Service.d3().then(function(d3) {

				// var respondentList = [];

				// day.times.forEach(function(time){
				// 		for (var i=0; i<time.responses.length; i++){
				// 			time.responses[i].index = i;
				// 			time.responses[i].time = time.time;
				// 			time.responses[i].allTimesIndex = day.allTimes.indexOf(time.responses[i].time);
				// 			responseData.push(time.responses[i]);
				// 		}
				// 	})

// var responses = [{"username":"ringo","status":"able","UUID":"991f69df-59c8-4ac1-892d-d8d1159095f7","time":1423998000000,"superStatus":"able","num":1},{"username":"lebron","status":"ifneedbe","UUID":"78a020fd-bc44-4a20-9c9f-c14319e6119b","time":1423998000000,"superStatus":"ifneedbe","num":1},{"username":"madeleine albright","status":"ifneedbe","UUID":"8937ed87-8001-4dba-9228-64dd0190b9c9","time":1423998000000,"superStatus":"ifneedbe","num":1},{"username":"jack nicklaus","status":"ifneedbe","UUID":"f0970add-fd49-4155-a496-cb27c8996e98","time":1423998000000,"superStatus":"ifneedbe","num":1},{"username":"george","status":"ifneedbe","UUID":"1cd24509-4cfb-4f9c-83f2-840c71374648","time":1423998000000,"superStatus":"ifneedbe","num":1},{"username":"the freaking pope","status":"ifneedbe","UUID":"a4173b52-dfda-4b6f-962a-6676e4b3faa7","time":1423998000000,"superStatus":"ifneedbe","num":1},{"username":"diddy","status":"ifneedbe","UUID":"f732363d-70d2-4131-a0d6-3a17e36a9027","time":1423998000000,"superStatus":"ifneedbe","num":1},{"username":"charro","status":"ifneedbe","UUID":"0f5486ba-ac8a-4fce-960a-c7d3e9159b02","time":1423998000000,"superStatus":"ifneedbe","num":1},{"username":"jerry","status":"maybe","UUID":"69b82854-e541-409c-9432-161fa89a7ccb","time":1423998000000,"superStatus":"maybe","num":1},{"username":"the riddler","status":"maybe","UUID":"9758045b-2bcc-4a25-abd2-ae0869695fb4","time":1423998000000,"superStatus":"maybe","num":1},{"username":"tom bergeron","status":"maybe","UUID":"6627c222-67ae-4165-9b9d-7f0228fafe0b","time":1423998000000,"superStatus":"maybe","num":1},{"username":"c3po","status":"maybe","UUID":"f3c55b0e-0b1f-4cd1-ac10-363de5d84aa6","time":1423998000000,"superStatus":"maybe","num":1},{"username":"tucker carlson","status":"maybe","UUID":"556e39d2-0390-4c9d-9d14-f282925c7726","time":1423998000000,"superStatus":"maybe","num":1},{"username":"kramer","status":"maybe","UUID":"14d341f9-da29-433a-9158-ac4d73c838a8","time":1423998000000,"superStatus":"maybe","num":1},{"username":"prince","status":"maybe","UUID":"701b82ca-f37e-4706-8be5-b8ffcaab293b","time":1423998000000,"superStatus":"maybe","num":1}]

 				// var responses = [{"username":"brian williams","status":"ifneedbe","UUID":"6c8198d7-8e79-4c62-966c-f3784ad69404","time":1424241000000,"superStatus":"ifneedbe","num":2}]

 				var responses = scope.selected;

 				console.log('this is the directive input data', scope.selected)


				renderChart(responses);


				function renderChart (responses){


					var numResponses = responses.length

					

					var m = {top: 40, right: 60, bottom: 20, left: 60},
					frameWidth = parseInt(d3.select('#dayChart').style('width'))-m.left - m.right,
					frameHeight = parseInt(d3.select('#dayChart').style('height'))*15;


// angular.element( "#indiv-status-chart" ).empty();

				var svg = d3.select('#indiv-status-chart').append("div")
				.attr("class","d3-container container")
				.selectAll("svg").data(d3.range(1))
				.enter().append("svg")
				.attr("id","viz")
				.attr("width",frameWidth + m.right +m.left)
				.attr("height",frameHeight + m.top + m.bottom)
				.append("g")
				.attr('transform', 'translate(' + m.left + ', ' + m.top + ')');

				function viewBars (responses) {
					/* add bars to chart */
					svg.append("g")
					.attr("class","chart")
					.selectAll("rect")
					.data(responses)
					.enter()
					.append("rect")
					.attr("class", function(d){ return d.status})
					.attr("UUID", function(d){ return d.UUID })
					.attr("x", 0)
					.attr("y",function(d, i){ return i*frameHeight/numResponses })
					.attr("rx", 1)
					.attr("ry", 1)
					.attr("width", frameWidth - 1)
					.attr("height", 50)
					// .attr("height", frameHeight/numResponses - 1)
					.attr("username", function(d){ return d.username})
  					


					svg.selectAll("text")
   					.data(responses)
   					.enter()
   					.append("text")
   					.text(function(d) {return d.username})
    				.attr("x", function(){
	                    return (frameWidth/2)
	                })
	                .attr("y", function(d, i){ 
	                    return i*frameHeight/numResponses + frameHeight/(2*numResponses) + 6
	                })
	                .attr("font-family", "Arial Black")
	                .attr("font-size", "20px")
	                .attr("fill", "white")
	                .attr("text-anchor", "middle")
	                
					
					// var addText = svgContainer.selectAll("username").data(responses).enter().append("username");

		   //           var textElements = addText
		   //              
					

			};

			viewBars(responses);
		};
	});
			});
}};
}]);

