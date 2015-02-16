'use strict';

angular.module('doodleplusApp')

  .controller('ManageEventCtrl', function ($scope, $stateParams, storeEvent, Time, Response, responseChartData, Auth, Contact) {
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
          console.log('event on scope',$scope.event);
        }
    })

    var eventID = $stateParams.event_id;

    responseChartData.generateResponseData(eventID)
        .then (function(days){
            $scope.days = days.days;
            $scope.responses = [];
            days.days.forEach(function(elem,idx){
                $scope.responses[idx] = [];
            });
    });


    $scope.respondents = [];

    $scope.pullData = function(response){
        console.log('pullData response',response);
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
        console.log('res',res);
      });
    };

    $scope.editEvent = function(){ //Needs to be worked on

    }




});



// -authenticated - login
// -list of different events a user has; nearest starting date first
// -past events??


// -manage events:
// --add more times
// --link to recreate/update event page
// --add more ppl to invite
// --close out the event
