'use strict';

angular.module('doodleplusApp')

  .controller('ManageEventCtrl', function ($scope, $stateParams, storeEvent, Time, Response, responseChartData, Auth) {
    var responseArray = [];
    $scope.responses = [];
    $scope.emailToAdd = "";

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
            console.log($scope.days)
            $scope.eventTitle = $scope.days[0].eventTitle;
        }
    })

    var eventID = $stateParams.event_id;

    responseChartData.generateResponseData(eventID)
        .then (function(days){
            $scope.days = days.days;
            $scope.responses = []
            days.days.forEach(function(elem,idx){
                $scope.responses[idx] = [];
            })
            // console.log('response',$scope.responses);
    });


    $scope.respondents = [];

    $scope.pullData = function(response){
        console.log('pullData response',response);
        $scope.responses[$scope.currentIndex] = response; 
        $scope.$apply();
    };

    $scope.changeDay = function(curInd,selInd){
        console.log('curInd',curInd,'selInd',selInd);
        $scope.currentIndex = curInd;
        console.log('responses',$scope.responses[$scope.currentIndex]);
    }

});

    mCtrl.event_id = $stateParams.event_id;

    $scope.getEvent = function(eventID) {
        storeEvent.getEvent(eventID, function() {
            $scope.event = storeEvent.event;
            $scope.times = storeEvent.event.Times;
            Time.organizeByDay($scope.times);
            $scope.days = Time.days;
            console.log(Time.days)
        });
    }

    $scope.getEvent($stateParams.event_id);

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
  });


// -authenticated - login
// -list of different events a user has; nearest starting date first
// -past events??


// -manage events:
// --add more times
// --link to recreate/update event page
// --add more ppl to invite
// --close out the event
