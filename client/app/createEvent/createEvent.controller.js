'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($scope, storeEvent, time) {
    $scope.message = function(){
      console.log('hi');
    };
    $scope.invitedEmails = [];
    $scope.eventOptions = {};
    $scope.userOptions = {};
    $scope.timeOptions = [{
      label: '15 Minutes',
      timeIncrement: 900000
    },{
      label: '30 Minutes',
      timeIncrement: 1800000
    },{
      label: '1 Hour',
      timeIncrement: 3600000
    },{
      label: '1 Day',
      timeIncrement: 86400000
    }];
    $scope.selectedDates = [];

    $scope.test = function(){
      console.log('date',$scope.timeOptions.date);
      console.log('selectedDates',$scope.selectedDates);
    }

    $scope.genTimes =function(){
      $scope.times = time.genTime(1422898264,$scope.selected.timeIncrement);
      storeEvent.save({
        event: $scope.eventOptions,
        user: $scope.userOptions,
        time: $scope.times
      }, function(res){
        console.log("response",res);
      });
    };

    $scope.storeEvent = function()
    {
      storeEvent.save({
          event: $scope.eventOptions,
          user: $scope.userOptions,
          time: $scope.timeOptions
        }, function(something) {
          console.log(something);
        });
    };

    $scope.addEmail = function(){
      if ($scope.emailToAdd){
        $scope.invitedEmails.push($scope.emailToAdd);
      }
    }
  });
