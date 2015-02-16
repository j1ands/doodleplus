'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($filter, $scope, storeEvent, Time, dayTime, Contact, $location, $cookieStore, Auth, socket, $timeout) {
    $scope.message = function(){
      console.log('event');
    };

    var ceCtrl = this;
    ceCtrl.currentUser = {};
    ceCtrl.currentUser.user = Auth.getCurrentUser();
    socket.userUpdate(function(){
      $timeout(function(){
        Auth.checkUserToken();
        ceCtrl.currentUser.user = Auth.getCurrentUser();
        $scope.$apply();
      }, 750);
    });
    $scope.contacts = {};
    $scope.contacts.emails = "";
    $scope.isPhone = typeof window.orientation !== 'undefined';
    $scope.invitedEmails = [];
    $scope.eventOptions = {
      isPrivate: false,
      title: storeEvent.title
    };
    $scope.userOptions = {};
    $scope.allDays = {value: false};
    //used to check if a date was selected in the datepicker.
    $scope.oldDates = {length: 0};
    $scope.eventOptions.isPrivate = false;
    $scope.selectedDates = [];
    dayTime.setSelected($scope.selectedDates.slice());
    $scope.selectedIndex = 0;

    $scope.date = {};
    $scope.dateToggle = {value: true};
    $scope.dayHours = [];
    //Panel Show Logic
    $scope.currentPanel = 0;
    
    $scope.showNextPanel = function(currentPanel){
      if ($scope.EventInfo.$valid){
        if (currentPanel<2){
          $scope.currentPanel+=1;
        }
      }
    };
    $scope.showPrevPanel = function(){
      if ($scope.currentPanel!==0){
        $scope.currentPanel-=1;
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




    $scope.updateDays = function () {
      $scope.dayHours = $filter('orderBy')($scope.dayHours, function(arr){return arr[0].time});
    };

    $scope.allDays.apply = function(tab)
    {
      console.log('selectedIndex',tab);
        var selectedTimes = [];
        $scope.dayHours[tab].forEach(function(time, index){
          if(time.selected)
          {
            selectedTimes.push(index);
          }
        });
        $scope.selectedDates.forEach(function(date, index){
          console.log("WAAA", $scope.selectedDates);
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
      console.log('emails to add',$scope.contacts.emails);
      var mergedTimes = [];
      mergedTimes = Time.filterTimes(mergedTimes.concat.apply(mergedTimes, $scope.dayHours));
      storeEvent.save({
        event: $scope.eventOptions,
        user: $scope.userOptions,
        time: mergedTimes
      }, function(res){
        console.log("response",res);
        $cookieStore.put('user', res.user._id);
        $location.path('/manageEvent/' + res.createdEvent._id);
      });
    };

    $scope.addEmail = function(){
      if ($scope.contacts.emails){
        $scope.invitedEmails.push($scope.contacts.emails);
      }
    };
    //Creating Event & Saving contacts
    $scope.saveEvent = function () {
      var mergedTimes = [];
      mergedTimes = Time.filterTimes(mergedTimes.concat.apply(mergedTimes, $scope.dayHours));
      console.log('the merged time',mergedTimes);
      $scope.eventOptions.timeIncrement = $scope.timeIncrement;
      storeEvent.save({
        event: $scope.eventOptions,
        user: $scope.userOptions,
        time: mergedTimes
      }, function (res) {
        if (!res.createdEvent._id){
          $scope.eventFailure = true;
          return;
        }
	       
        $cookieStore.put('user', res.user._id);
        console.log('res',res);
        ceCtrl.createdEvent = res.createdEvent;
        $scope.currentPanel+=1;
      });
    };

    $scope.addContacts = function () {
      var contactsToAdd = {
        eventId: $scope.createdEvent._id,
        contacts: $scope.contacts
      };
      Contact.save(contactsToAdd,function(res){
          console.log('res',res);
      });
    };

    $scope.addGoogleContactToText = function(contact) {
      var index = $scope.contacts.emails.indexOf(contact.email);
      if($scope.contacts.emails == "")
      {
        $scope.contacts.emails += contact.email;
      }
      else if(index > -1)
      {
        if(index == 0)
        {
          $scope.contacts.emails = $scope.contacts.emails.replace(new RegExp(contact.email + '(\, )?', 'g'), "");
        }
        else
        {
          $scope.contacts.emails = $scope.contacts.emails.replace(new RegExp('(\, )?' + contact.email, 'g'), "");
        }
      }
      else
      {
        $scope.contacts.emails += ", " + contact.email;
      }
      if(contact.selected)
      {
        contact.selected = false;
      }
      else
      {
        contact.selected = true;
      }

    }    

  });
