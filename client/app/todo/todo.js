angular.module('todooly.todo', [])

.controller('ShortenController', function ($scope, $location, Links) {

$scope.submission = {};
$scope.submitLink = function() {
  Links.submitLink($scope.submission)
    .then(function(ret){
      $scope.response = ret;
      //concat base_url and short-code
      $scope.response.shortUrl = $scope.response.base_url + '/api/links/' + $scope.response.code;
      //attach that as new property to $scope.response

      console.log($scope.response);
    });
  
  };

});