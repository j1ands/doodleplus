'use strict';

angular.module('doodleplusApp')

  .controller('ManageEventCtrl', function ($scope, $stateParams, Time, Response, responseChartData, Auth, Contact,manageEvent,$timeout,$mdToast, socket) {
    var responseArray = [];
    $scope.contacts = {};
    $scope.contacts.emails = "";
    $scope.responses = [];
    $scope.emailToAdd = "";
    $scope.currentPanel = 0;
    $scope.isPhone = typeof window.orientation !== 'undefined';
    if ($scope.isPhone){
      $scope.mult=18;
    } else {
      $scope.mult=10;
    }

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
    $scope.respondents = [];

    var formatRespondents = function(days){
        var pushed = [];
        days.forEach(function(day){
            day.times.forEach(function(time){
                for (var i=0; i<time.responses.length; i++){
                    if (pushed.indexOf(time.responses[i].UUID) < 0){
                        $scope.respondents.push({ username: time.responses[i].username, UUID: time.responses[i].UUID });
                        pushed.push(time.responses[i].UUID);
                    }
                }
            })
        })
    }

    responseChartData.generateResponseData(admin)
        .then (function(days){
            mCtrl.event.id = days.eventID;
            $scope.days = days.days;
            $scope.responses = [];
            days.days.forEach(function(elem,idx){
                $scope.responses[idx] = [];
            });
            formatRespondents($scope.days);
            console.log($scope.respondents)
        });


    var colorRespondents = function(responses) {
        var coloredRespondents = $scope.respondents;
        coloredRespondents.forEach(function(respondent){
            respondent.superStatus = null;
            for (var i=0; i<responses.length; i++){
                if (respondent.UUID === responses[i].UUID){
                    respondent.superStatus = responses[i].superStatus;
                }
            }
        })
        console.log(coloredRespondents)
        return coloredRespondents;
    }

    // var deColorRespondents = function() {
    //     for (var i; i<$scope.respondents; i++){
    //         $scope.respondents[i].superstatus = undefined;
    //     }
    // }


    $scope.pullData = function(response){
        $scope.responses[$scope.currentIndex] = colorRespondents(response);
        $scope.$apply();
    };

    $scope.changeDay = function(curInd,selInd){
        $scope.currentIndex = curInd;
    };

    mCtrl.event_id = $stateParams.event_id;

    $scope.addGoogleContactToText = function(contact) {
        var index = $scope.contacts.emails.indexOf(contact.email);
        if($scope.emailToAdd == "")
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
            $scope.contacts.emails+= ", " + contact.email;
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
      // console.log('manageEvent',manageEvent);
      manageEvent.save({adminURL: admin},{event: $scope.event},function(res){
        // console.log('updateRes',res);
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

    socket.userUpdate(function(){
      $timeout(function(){
        Auth.checkUserToken();
        mCtrl.currentUser.user = Auth.getCurrentUser();
        $scope.$apply();
      }, 750);
    });
 


});



// -authenticated - login
// -list of different events a user has; nearest starting date first
// -past events??


// -manage events:
// --add more times
// --link to recreate/update event page
// --add more ppl to invite
// --close out the event
