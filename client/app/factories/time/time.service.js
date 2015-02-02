'use strict';

angular.module('doodleplusApp')
  .factory('time', function () {
    // Service logic
    // ...
    var dayTimeMs = 86400000;

    //Currently Generating Fake Data
    function genTimes(startTime,increment) {
      var numRepeat = Math.floor((dayTimeMs / increment));
      var times = [];
      for (var i = 0; i < numRepeat; i++) {
        var timeNum = startTime + i * increment;
        times.push({
          time: timeNum,
          selected: false
        });
      }
      return times;
    }


    // Public API here
    return {
      genTime: genTimes
    };
  });
