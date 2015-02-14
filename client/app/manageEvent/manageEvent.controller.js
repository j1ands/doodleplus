'use strict';

angular.module('doodleplusApp')
  .controller('ManageEventCtrl', function ($scope, $stateParams, storeEvent, Time, Response, Auth) {
    var responseArray = [];
    $scope.responses = [];
    $scope.emailToAdd = "";

    var mCtrl = this;

    mCtrl.currentUser = Auth.getCurrentUser();

    $scope.pullData = function(response){
    	$scope.responses = [];
        $scope.responses = response;
    	$scope.$apply();
    };

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
