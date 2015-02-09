'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($filter, $scope, storeEvent, Time, $mdToast, $animate, dayTime, $timeout) {
    $scope.message = function(){
      console.log('event');
    };

    $scope.allDays = {value: false};
    //used to check if a date was selected in the datepicker.
    $scope.oldDates = {length: 0};

    //Panel Show Logic
    var showLastPage = false;

    $scope.showItem = [true,false,false,false];
    $scope.showNextPanel = function(){
      if ($scope.EventInfo.$valid){
        var index = $scope.showItem.indexOf(true);
        console.log('index',index);
        if (index<2){
          $scope.showItem[index]=false;
          $scope.showItem[index+1]=true;
        } else if (index===2 && showLastPage){
          $scope.showItem[index]=false;
          $scope.showItem[index+1]=true;
        }
      }
    };
    $scope.showPrevPanel = function(){
      var index = $scope.showItem.indexOf(true);
      console.log('prev',index);
      if (index!==0){
        $scope.showItem[index]=false;
        $scope.showItem[index-1]=true;
      }
    };



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
    $scope.timeIncrement = $scope.timeOptions[1];

    $scope.invitedEmails = [];
    $scope.eventOptions = {};
    $scope.userOptions = {};


    $scope.selectedDates = [];
    dayTime.setSelected($scope.selectedDates.slice());

    $scope.date = {};
    $scope.dateToggle = {value: true};
    $scope.dayHours = [];
    $scope.updateDays = function () {
      $scope.dayHours = $filter('orderBy')($scope.dayHours, function(arr){return arr[0].time});
    };

    $scope.allDays.apply = function(tab)
    {
        var selectedTimes = [];
        $scope.dayHours[tab].forEach(function(time, index){
          if(time.selected)
          {
            selectedTimes.push(index);
          }
        });
        $scope.selectedDates.forEach(function(date, index){
          if(index !== tab)
          {
            selectedTimes.forEach(function(val){
              $scope.dayHours[index][val].selected = true;
            });
          }
        });
    };

    $scope.timeOptions.times = [];


    $scope.toggleDate = function()
    {
      $scope.dateToggle.value = !$scope.dateToggle.value;
      if(!$scope.dateToggle.value)
      {
        $scope.dayHours = $filter('orderBy')($scope.dayHours, function(arr){return arr[0].time});
      }
    };

    var initVal = null;
    var isMouseDown = false;

    $scope.timeClick = function(e,index, tab) {
      initVal = $scope.dayHours[tab][index].selected;
      isMouseDown = true;
      $scope.dayHours[tab][index].selected = !initVal;
    };

    $scope.timeEnter = function(e, index, tab) {
      if(isMouseDown && $scope.dayHours[tab][index].selected===initVal) {
        $scope.dayHours[tab][index].selected = !initVal;
      }
    };

    $scope.timeUp = function() {
      isMouseDown = false;
      initVal = null;
    };


    $scope.genTimes =function(){
      console.log('emails to add',$scope.emailToAdd);
      var mergedTimes = [];
      mergedTimes = Time.filterTimes(mergedTimes.concat.apply(mergedTimes, $scope.dayHours));
      storeEvent.save({
        event: $scope.eventOptions,
        user: $scope.userOptions,
        time: mergedTimes
      }, function(res){
        console.log("response",res);
      });
    };

    $scope.addEmail = function(){
      if ($scope.emailToAdd){
        $scope.invitedEmails.push($scope.emailToAdd);
      }
    };

    $scope.saveEvent = function () {
      showLastPage = true;
    };

    $scope.testAdding = function(){
      console.log('dayhours',$scope.dayHours);
      console.log('selectedIndex',$scope.selectedIndex);
      $scope.selectedIndex = (Math.random()>.5) ? 0: 1;
    }
  });
