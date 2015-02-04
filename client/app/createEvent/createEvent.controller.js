'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($scope, storeEvent, time, $mdToast, $animate, dayTime) {
    $scope.message = function(){
      console.log('hi');
    }

    //used to check if a date was selected in the datepicker.
    $scope.oldDates = {length: 0};
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
    dayTime.setSelected($scope.selectedDates.slice());

    $scope.date = {};
    $scope.dateToggle = {value: true};
    $scope.dayHours = [];


    $scope.timeOptions.times = [];

    $scope.updateDay = function(){
      var increment = $scope.selected ? $scope.selected.timeIncrement : 900000;
      dayTime.updateDay($scope.selectedDates,$scope.dayHours,increment);
      //debugger;
    };

    $scope.toggleDate = function()
    {
      $scope.dateToggle.value = !$scope.dateToggle.value;
    }

    $scope.isMouseDown = {value:false};

    $scope.timeClick = function(e,index)
    {
      $scope.isMouseDown.value = true;
      angular.element(e.target).toggleClass("success");
      var selectedIndex = $scope.selectedDates.length - 1;
      $scope.dayHours[selectedIndex][index].selected = true;
    }

    $scope.timeEnter = function(e, index)
    {
      if($scope.isMouseDown.value)
      {
        angular.element(e.target).toggleClass("success");
        var selectedIndex = $scope.selectedDates.length - 1;
        $scope.dayHours[selectedIndex][index].selected = true;
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
      // var increment = $scope.selected ? $scope.selected.timeIncrement : 900000;
      // var currentTime = $scope.date.value.getTime();
      // var today = currentTime;

      // var dayTimes = [];

      // while(currentTime < today + 86400000)
      // {
      //   dayTimes.push(new Date(currentTime));
      //   currentTime += increment;
      // }

      // $scope.dayTimes = dayTimes;

    }

    // $scope.genTimes =function(){
    //   $scope.times = time.genTime(1422898264,$scope.selected.timeIncrement);
    //   storeEvent.save({
    //     event: $scope.eventOptions,
    //     user: $scope.userOptions,
    //     time: time.filterTimes($scope.times)
    //   }, function(res){
    //     console.log("response",res);
    //   });
    // };

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

    $scope.showEdit = function()
    {
      if($scope.oldDates.length != $scope.selectedDates.length)
      {
        if(!$scope.selectedDates.length)
        {
          $mdToast.cancel();
        }
        else
        {
          $scope.updateDay();
          $scope.showToast();
        }
        $scope.oldDates.length = $scope.selectedDates.length;
      }
    }

    $scope.showToast = function() {
      var toast = $mdToast.simple()
            .content($scope.selectedDates.length > 1 ? 'Click here to edit these days:' : 'Click here to edit this day:')
            .action('EDIT')
            .highlightAction(false)
            .hideDelay(0)
            .position('top right');
      $mdToast.show(toast).then(function() {
        $scope.dayView();
      });
    };  

    $scope.dateString = function(str)
    {
      var currDate = new Date(str);
      return currDate.toDateString();
    }

  });
