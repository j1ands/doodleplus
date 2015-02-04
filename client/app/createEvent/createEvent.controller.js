'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($scope, storeEvent, time) {
    $scope.message = function(){
      console.log('hi');
    }

    var ceCtrl = this;

    // $scope.testClick = function(t)
    // {
    //   console.log("click");
    // }

    // $scope.testMouseEnter = function(t)
    // {
    //   console.log("enter");
    // }


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


    $scope.date = {};
    ceCtrl.dateToggle = {value: true};
    $scope.dayTimes = [];

    $scope.timeOptions.times = [];

    $scope.toggleDate = function()
    {
      ceCtrl.dateToggle.value = !ceCtrl.dateToggle.value;
    }

    $scope.isMouseDown = {value:false};

    $scope.timeClick = function(e)
    {
      $scope.isMouseDown.value = true;
      angular.element(e.target).toggleClass("success");
    }

    $scope.timeEnter = function(e)
    {
      if($scope.isMouseDown.value)
      {
        angular.element(e.target).toggleClass("success");
      }
    }

    $scope.timeUp = function(e)
    {
      $scope.isMouseDown.value = false;
    }

    // ceCtrl.toggleDate = function()
    // {
    //   $scope.dateToggle.value = !$scope.dateToggle.value;
    // }

    $scope.dayView = function()
    {
      $scope.toggleDate();

      var increment = $scope.selected ? $scope.selected.timeIncrement : 900000;
      var currentTime = $scope.date.value.getTime();
      var today = currentTime;

      var dayTimes = [];

      while(currentTime < today + 86400000)
      {
        dayTimes.push(new Date(currentTime));
        currentTime += increment;
      }

      $scope.dayTimes = dayTimes;

    }

    $scope.genTimes =function(){
      $scope.times = time.genTime(1422898264,$scope.selected.timeIncrement);
      storeEvent.save({
        event: $scope.eventOptions,
        user: $scope.userOptions,
        time: time.filterTimes($scope.times)
      }, function(res){
        console.log("response",res);
      });
    };

    // $scope.storeEvent = function()
    // {
    //   storeEvent.save({
    //       event: $scope.eventOptions,
    //       user: $scope.userOptions,
    //       time: $scope.date
    //     }, function(something) {
    //       console.log(something);
    //     });
    // };

    $scope.addEmail = function(){
      if ($scope.emailToAdd){
        $scope.invitedEmails.push($scope.emailToAdd);
      }
    }
  });
