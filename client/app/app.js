angular.module('todooly', [
  'todooly.todo'])

.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/', {

    })
    .when('/todo', {

    })
    .otherwise({
      redirectTo: '/'
    });

})

.factory('', function(){

})

.run(function(){

});