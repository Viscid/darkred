angular.module('darkred').controller('mainController', function($scope, $state, AuthService, $rootScope, $timeout) {
$timeout(function() {
    if (!$rootScope.user) {
      console.log('User not logged in, redirecting...')
      $state.go('login');
    }
}, 2000)

})
