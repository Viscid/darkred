angular.module('darkred').controller('loginController', function($scope, $state, AuthService, $rootScope) {
  if ($rootScope.user) { // User is already logged in!
    $state.go('main');
  }

  $scope.login = function() {
    //initial values

    $scope.error = false;
    $scope.disabled = true;

    //call login from service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      .then(function() {
        $state.go('main');
        $scope.disabled = false;
        $scope.loginForm = {};
      })

    // handle error
    .catch(function() {
      $scope.error = true;
      $scope.errorMessage = "Invalid!";
      $scope.disabled = false;
      $scope.loginForm = {};
    });

  };

});
