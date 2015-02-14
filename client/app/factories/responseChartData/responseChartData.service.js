'use strict';

angular.module('doodleplusApp')
.factory('responseChartData', function (storeEvent, Time, $q) {

  var generateResponseData = function(eventID){
    var daysDeferral = $q.defer();
    storeEvent.getEvent(eventID, null, function() {
      var event = storeEvent.event;
      var times = storeEvent.event.times;
      Time.organizeByDay(times);
      var days = Time.days;
      days.forEach(function(day){
        day.eventTitle = storeEvent.event.title;
        var allRespondents = [];
        var allTimes = [];

        day.times.sort(function(a,b){     //sort event times
          var timeA = a.time;
          var timeB = b.time;
          return (timeA < timeB) ? -1 : (timeA > timeB) ? 1 : 0;
        });
        day.times.forEach(function(time){ //extract all UUIDs and times to reduce
          for (var i=0; i<time.responses.length; i++){
            allRespondents.push(time.responses[i].UUID);
            allTimes.push(time.time);
          };    
          time.responses.sort(function(a,b){  //sort responses by status
            var textA = a.status.toUpperCase();
            var textB = b.status.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });
        })
        day.allRespondents = allRespondents.reduce(function(accum, current) {  //reduce respondent UUIDs
          if (accum.indexOf(current) < 0) {
            accum.push(current);
          }
          return accum;
        }, []);
        day.allTimes = allTimes.reduce(function(accum, current) {  //reduce times
          if (accum.indexOf(current) < 0) {
            accum.push(current);
          }
          return accum;
        }, []);
      });
    var dayObj = {};
    dayObj.days = days;
    daysDeferral.resolve(dayObj)
    });
  return daysDeferral.promise;
  };

return {
  generateResponseData: generateResponseData
};
});

