'use strict';


angular.module('doodleplusApp')
  .controller('EventResponseCtrl', function ($scope, $stateParams, storeEvent, Time, Response, Auth,$cookieStore,$mdToast) {

  	$scope.mouseDown = false;
  	$scope.responses = [];
  	$scope.days = [];
    $scope.username = {};
    $scope.oldResponses = [];
    $scope.selectedDates = [];
    $scope.showCalendar = false;
    $scope.selectedDay = {index: 0};

    var event_id = $stateParams.event_id;
    var openToast =  function() {
      $mdToast.show(
        $mdToast.simple()
          .content('Inivites Sent')
          .position('bottom left')
          .hideDelay(3000)
      );
    };

    var setEventDetails = function(thisEvent, username, oldResponses) {
      $scope.event = thisEvent;
      $scope.times = thisEvent.times;
      Time.organizeByDay($scope.times);
      $scope.days = Time.days;
      $scope.username.name = username;
      $scope.oldResponses = oldResponses;
      $scope.showCalendar = true;
    };

    $scope.getEvent = function(eventID, UUID) {
      storeEvent.getEvent(eventID, UUID, setEventDetails);
    };

    var setUUID = function(obj) {
      $scope.UUID = obj.UUID;
      $scope.getEvent($stateParams.event_id, $scope.UUID);
    };

    if (Auth.getRespondeeToken()) {
      Auth.getCurrentRespondee(setUUID)
    } else
    {
      Auth.createRespondee(setUUID);
    }



    $scope.submitResponses = function() {
      Response.saveResponses($scope.username.name, $scope.UUID, $scope.oldResponses, openToast);
    };

    $scope.selectResponse = function(time, response) {
      $scope.mouseDown = true;
      if(time.status === response) {
        time.status = "removed";
        time[response] = false;
      } else {
        time.able = false;
        time.ifneedbe = false;
        time.maybe = false;
        time.status = response;
        time[response] = true;
      }
    };

    $scope.resetMouse = function() {
      $scope.mouseDown = false;
    };

    $scope.checkClick = function(time, response) {
      if ($scope.mouseDown === true) {
        time.able = false;
        time.ifneedbe = false;
        time.maybe = false;
        time.status = response;
        time[response] = true;
      }
    };

    $scope.dateDisabled = function(date, mode) {
      var found = true;
        var dateStr = date.toString();
        if ($scope.days.length > 0) {
          $scope.days.forEach(function(day) {
            if (dateStr.search(day.date) > -1 || mode !== "day") {
              found = false;
              $scope.selectedDates.push(date.getTime() - 43200000);
            }
          });
        }
      return found
    };

    $scope.changePage = function(date) {
      // will not handle some edge cases (ex. if the days are out of order)
      if (date) {
        var dateStr = date.toString();

        $scope.days.forEach(function(day, i) {
          if (dateStr.search(day.date) > -1) {
            $scope.selectedDay.index = i;
          }
        });
      }
    };

    var count = 0;
    var findOffset = function() {
      if (count < 3) {
        var div_top = $('.md-header').offset().top;
        $scope.div_top = div_top;
        count++;
      }
    }

    findOffset();

    function sticky_relocate() {
      var window_top = $(window).scrollTop();
      findOffset();
      if (window_top > $scope.div_top) {
        $('.md-header').attr('id', 'stick');
      } else {
        $('.md-header').removeAttr('id', 'stick');
      }
    }

    $(function() {
      $(window).scroll(sticky_relocate);
      sticky_relocate();
    });

  });

