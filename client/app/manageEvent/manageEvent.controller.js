'use strict';

angular.module('doodleplusApp')

  .controller('ManageEventCtrl', function ($scope, $stateParams, Time, Response, responseChartData, Auth, Contact,manageEvent,$timeout,$mdToast) {
    var responseArray = [];
    $scope.responses = [];
    $scope.emailToAdd = "";
    $scope.currentPanel = 0;
    $scope.isPhone = typeof window.orientation !== 'undefined';
    $scope.changePanel = function(number){
      $scope.currentPanel = number;
    };

    var mCtrl = this;

    mCtrl.currentUser = Auth.getCurrentUser();

    mCtrl.event = {};
    $scope.days = [];
    $scope.currentIndex = 0;
    $scope.isDays = {
        value: false
    };

    $scope.$watch("days", function(newVal, oldVal){
        if(newVal.length){
            $scope.isDays.value = true;
            $scope.eventTitle = $scope.days[0].eventTitle;
            $scope.event = $scope.days[0].event;
        }
    })

    var admin = $stateParams.admin;

    responseChartData.generateResponseData(admin)
        .then (function(days){
            mCtrl.event.id = days.eventID;
            $scope.days = days.days;
            $scope.responses = [];
            days.days.forEach(function(elem,idx){
                $scope.responses[idx] = [];
            });
    });


    $scope.respondents = [];

    $scope.pullData = function(response){
        $scope.responses[$scope.currentIndex] = response;
        $scope.$apply();
    };

    $scope.changeDay = function(curInd,selInd){
        $scope.currentIndex = curInd;
    };

    mCtrl.event_id = $stateParams.event_id;
    
    $scope.addGoogleContactToText = function(contact) {
        var index = $scope.emailToAdd.indexOf(contact.email);
        if($scope.emailToAdd == "")
        {
        $scope.emailToAdd += contact.email;
        }
        else if(index > -1)
        {
            if(index == 0)
            {
                $scope.emailToAdd = $scope.emailToAdd.replace(new RegExp(contact.email + '(\, )?', 'g'), "");
            }
            else
            {
                $scope.emailToAdd = $scope.emailToAdd.replace(new RegExp('(\, )?' + contact.email, 'g'), "");
            }
        }
        else
        {
            $scope.emailToAdd+= ", " + contact.email;
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

    $scope.addContacts = function () {
      var contactsToAdd = {
        eventId: $scope.event._id,
        contacts: $scope.contacts
      };
      Contact.save(contactsToAdd,function(res){
      });
    };
    var openToast =  function() {
      $mdToast.show(
        $mdToast.simple()
          .content('Event Updated')
          .position('top right')
          .hideDelay(3000)
      );
    };

    $scope.editEvent = function(){ //Needs to be worked on
      console.log('manageEvent',manageEvent);
      manageEvent.save({adminURL: admin},{event: $scope.event},function(res){
        console.log('updateRes',res);
        if (res.success){
          openToast();
          $scope.event = res.event;
          $scope.updated = 'Event Updated!';
          $timeout(function(){
            $scope.updated = null;
          }, 5000);
        } else {
          //Open up error dialogue
        }
      });
    };




});



// -authenticated - login
// -list of different events a user has; nearest starting date first
// -past events??


// -manage events:
// --add more times
// --link to recreate/update event page
// --add more ppl to invite
// --close out the event
