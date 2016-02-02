angular.module('darkred').controller('navController', function($scope, $state, AuthService, $rootScope) {
  $rootScope.$on('$stateChangeSuccess', function() {
    $scope.user = AuthService.getUser();
  });

  $scope.$on('userUpdate', function() {
    $scope.user = AuthService.getUser();
  });
});
