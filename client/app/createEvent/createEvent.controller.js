'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($scope, storeevent) {
    $scope.message = function(){
      console.log('hi');
    }

    var ceCtrl = this;

    $scope.invitedEmails = [];
    $scope.eventOptions = {};
    $scope.userOptions = {};
    $scope.timeOptions = {};
    $scope.dateToggle = {value: true};
    $scope.dayTimes = [];

    $scope.timeOptions.increment = "15 Minutes";
    $scope.timeOptions.times = [];

    ceCtrl.calculateIncrement = function(str)
    {
      switch(str)
      {
        case "15 Minutes":
          return 900000;
        case "30 Minutes":
          return 1800000;
        case "1 Hour":
          return 3600000;
        case "24 Hours":
          return 86400000;
      }
    }

    $scope.toggleDate = function()
    {
      $scope.dateToggle.value = !$scope.dateToggle.value;
    }

    $scope.dayView = function()
    {
      var increment = ceCtrl.calculateIncrement($scope.timeOptions.increment);
      var currentTime = $scope.timeOptions.date.getTime();
      var today = currentTime;

      $scope.dayTimes = [];

      while(currentTime < today + 86400000)
      {
        $scope.dayTimes.push(new Date(currentTime));
        currentTime += increment;
      }
      
      $scope.toggleDate();
    }

    $scope.storeEvent = function()
    {
      storeevent.save(
        {
          event: $scope.eventOptions,
          user: $scope.userOptions,
          time: $scope.timeOptions
        }, function(something)
        {
          console.log(something);
        })
    }

    $scope.addEmail = function(){
      if ($scope.emailToAdd){
        $scope.invitedEmails.push($scope.emailToAdd);
      }
    }
  });
