'use strict';

angular.module('doodleplusApp')
  .controller('ManageEventCtrl', function ($scope,rootscope) {
    $scope.test = function(){
    	console.log($scope)
    }
    // rootscope.$on('responseData',function(theResponseData){
    // 	$scope.responses = theResponseData;
    // })
  });

