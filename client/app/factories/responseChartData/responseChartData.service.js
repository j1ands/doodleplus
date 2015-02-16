'use strict';

angular.module('doodleplusApp')
.factory('responseChartData', function (manageEvent, Time, $q) {

  var generateResponseData = function(admin){
    var daysDeferral = $q.defer();
    manageEvent.getEvent(admin, null, function() {
      var event = manageEvent.event;
      var times = manageEvent.event.times;
      Time.organizeByDay(times);
      var days = Time.days;
      days.forEach(function(day){
        day.event = event;
        day.eventTitle = manageEvent.event.title;
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
    dayObj.eventID = event._id;
    daysDeferral.resolve(dayObj);
    });
  return daysDeferral.promise;
  };

return {
  generateResponseData: generateResponseData
};
});

