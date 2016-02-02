angular.module('darkred').controller('registerController', function($scope, $state, AuthService) {

$scope.register = function () {
  //initial values

  $scope.error = false;
  $scope.disabled = true;

  //call login from service
  AuthService.register($scope.registrationForm)

  .then(function() {
    $state.go('login');
    $scope.disabled = false;
    $scope.registrationForm = {};
  })

  // handle error
  .catch(function() {
    $scope.error = true;
    $scope.errorMessage = "Invalid!";
    $scope.disabled = false;
    $scope.registrationForm = {};
  });

};

});
