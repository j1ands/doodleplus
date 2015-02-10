'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($filter, $scope, storeEvent, Time, $mdToast, $animate, dayTime, $timeout, $location, $cookieStore) {
    $scope.message = function(){
      console.log('hi');
    }

    $cookieStore.remove('user');

    $scope.allDays = {};
    $scope.allDays.value = false;
    //used to check if a date was selected in the datepicker.
    $scope.oldDates = {length: 0};


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

    $scope.allDays.apply = function(tab)
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

      if(!$scope.dateToggle.value)
      {
        $scope.dayHours = $filter('orderBy')($scope.dayHours, function(arr){return arr[0].time});
      }
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
      $scope.dayHours[tab][index].selected = !$scope.dayHours[tab][index].selected;
    }

    $scope.timeEnter = function(e, index, tab)
    {
      if($scope.isMouseDown.value)
      {
        $scope.dayHours[tab][index].selected = !$scope.dayHours[tab][index].selected;
      }
    }

    $scope.timeUp = function(e)
    {
      $scope.isMouseDown.value = false;
    }

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
        $cookieStore.put('user', res.user._id);
        $location.path('/manageEvent/' + res.EventId._id);
      });
    };

    $scope.addEmail = function(){
      if ($scope.emailToAdd){
        $scope.invitedEmails.push($scope.emailToAdd);
      }
    }

  });
