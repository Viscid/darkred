angular.module('darkred').directive('navbar', function() {
  return {
    restrict: 'E',
    controller: 'navController',
    templateUrl: './partials/navbarDirective.html'
  }
})
