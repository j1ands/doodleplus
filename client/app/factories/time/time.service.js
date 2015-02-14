'use strict';

angular.module('doodleplusApp')
  .factory('Time', function ($resource) {
    // Service logic
    // ...
    var Time = $resource('/api/time/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    var dayTimeMs = 86400000;

    //Currently Generating Fake Data
    Time.genTimes = function (startTime,increment) {
      var numRepeat = Math.floor((dayTimeMs / increment));
      var times = [];
      for (var i = 0; i < numRepeat; i++) {
        var timeNum = startTime + i * increment;
        times.push({
          time: timeNum,
          selected: false //Should be false for production
        });
      }
      return times;
    }

    Time.filterTimes = function(timesArray){
      var times = [];
      timesArray.forEach(function(elem){
        if (elem.selected){
          times.push({
            time: elem.time
          });
        }
      });
      return times;
    };

    Time.organizeByDay = function(timesInMS) {
      Time.days = [];
      if(timesInMS)
      {
        timesInMS.forEach(function(time) {
          var timeInMS = Number(time.time);
          var convertedTime = new Date(timeInMS).toDateString();
          var dayFound = false;
          if (Time.days.length > 0) {
            Time.days.forEach(function(day) {
              if (day.date === convertedTime) {
                day.times.push(time);
                dayFound = true;
              }
            });
          }
          if (dayFound === false) {
            Time.days.push({date: convertedTime, dateInMS: time.time, times: [time]});
          }
        });
      }
    }


    // Public API here
    return Time;
  });
