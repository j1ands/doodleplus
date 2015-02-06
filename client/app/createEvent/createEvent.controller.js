'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($scope, storeEvent, Time, $mdToast, $animate, dayTime, $timeout) {
    $scope.message = function(){
      console.log('hi');
    }

    $scope.allDays = {};
    $scope.allDays.value = false;
    //used to check if a date was selected in the datepicker.
    $scope.oldDates = {length: 0};
    // $scope.selectedDateTab = {};
    // $scope.selectedDateTab.value = 0;


    $scope.testTouch = function(){
      $scope.swipeTest = 'Test Works!!!';
      console.log('swipe left works');
    };
    $scope.showItem = [true,false,false,false];

    $scope.swipeLeft = function(){
      var index = $scope.showItem.indexOf(true);
      if (index!==3){
        $scope.showItem[index]=false;
        $scope.showItem[index+1]=true;
      }
    }
    $scope.swipeRight = function(){
      var index = $scope.showItem.indexOf(true);
      if (index!==0){
        $scope.showItem[index]=false;
        $scope.showItem[index-1]=true;
      }
    }

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

    $scope.allDays.call = function(tab)
    {
        var selectedTimes = [];
        $scope.dayHours[tab].forEach(function(time, index){
          if(time.selected)
          {
            selectedTimes.push(index);
          }
        })
        $scope.selectedDates.forEach(function(date, index){
          if(index !== tab)
          {
            selectedTimes.forEach(function(val){
              $scope.dayHours[index][val].selected = true;
            });
          }
        })      
    }

    $scope.$watch('allDays.value', function(newValue, oldValue){
        $timeout(function(){
          $scope.allDays.value = false;
        }, 400);
    })


    $scope.timeOptions.times = [];


    $scope.toggleDate = function()
    {
      $scope.dateToggle.value = !$scope.dateToggle.value;
    }

    $scope.calendarView = function()
    {
      $scope.toggleDate();
      $scope.showToast();
    }

    $scope.isMouseDown = {value:false};

    $scope.timeClick = function(e,index, tab)
    {
      $scope.isMouseDown.value = true;
      //angular.element(e.target).toggleClass("success");
      //var selectedIndex = $scope.selectedDates.length - 1;
      //debugger;
      $scope.dayHours[tab][index].selected = !$scope.dayHours[tab][index].selected;
    }

    $scope.timeEnter = function(e, index, tab)
    {
      if($scope.isMouseDown.value)
      {
        //angular.element(e.target).toggleClass("success");
        //var selectedIndex = $scope.selectedDates.length - 1;
        //debugger;
        $scope.dayHours[tab][index].selected = !$scope.dayHours[tab][index].selected;
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

    // $scope.dayView = function()
    // {
    //   $scope.toggleDate();
    //   // var increment = $scope.selected ? $scope.selected.timeIncrement : 900000;
    //   // var currentTime = $scope.date.value.getTime();
    //   // var today = currentTime;

    //   // var dayTimes = [];

    //   // while(currentTime < today + 86400000)
    //   // {
    //   //   dayTimes.push(new Date(currentTime));
    //   //   currentTime += increment;
    //   // }

    //   // $scope.dayTimes = dayTimes;
    // }

    $scope.genTimes =function(){
      if (!$scope.emailToAdd){
        $scope.emailToAdd = '';
      }
      $scope.times = Time.genTimes(1422898264,$scope.selected.timeIncrement);
      storeEvent.save({
        event: $scope.eventOptions,
        user: $scope.userOptions,
        time: Time.filterTimes($scope.times),
        contact: $scope.contactOptions
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
