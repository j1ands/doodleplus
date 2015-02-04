'use strict';

angular.module('doodleplusApp')
  .factory('dayTime', function () {
    // Service logic
    // ...
    var selectedDates = [];
    var length = 0;
    function setSelected(scopeDates){
      selectedDates = scopeDates.slice();
      length = scopeDates.length;
    }

    function updateDay(scopeDates,scopeDaysView,increment){
      if (scopeDates.length>length){
        var startTimeInMs = scopeDates[scopeDates.length-1]; //the newest Date Added
        genDay(startTimeInMs,scopeDaysView,increment); //Add a new day to $scope.days
      } else if (scopeDates.length<length){
        removeDay(scopeDates,scopeDaysView);
      }
      setSelected(scopeDates);
    }


    function genDay(startTimeInMs,scopeDaysView,increment){
      console.log(increment);
      var timeIncrement = increment; //30 minutes in ms
      var dayTimeMs = 86400000; // time in a day
      var numTimesDisplay = Math.floor((dayTimeMs/timeIncrement)); //
      var dayArray = [];
      for (var i=0;i<numTimesDisplay; i++){
        var timeNum = startTimeInMs+i*timeIncrement;
        // var timeStr =(new Date(timeNum).toLocaleTimeString()); maybe not useful anymore. unsure
        dayArray.push({
          time: new Date(timeNum),
          selected: false
        });
      }
      scopeDaysView.push(dayArray);
    }

    function removeDay(scopeDates,scopeDaysView){
      var timeToRemove = selectedDates.filter(function(val){ //Finds the time to remove in ms
        return (scopeDates.indexOf(val) < 0); //returns an array. Just want the value;
      });
      var indexToRemove;
      scopeDaysView.forEach(function(dayArray, index){
        if (dayArray[0].time.getTime()===timeToRemove[0]){
          indexToRemove = index;
        }
      });

      scopeDaysView.splice(indexToRemove,1);
    }



    function transform(serverObj){
      var obj = serverObj;
      return obj;
    }
    // Public API here
    return {
      updateDay: updateDay,
      transform: transform,
      setSelected: setSelected
    };


  });