angular.module('darkred').controller('navController', function($scope, $state, AuthService, $rootScope, MessageFactory, $interval, AjaxFactory) {

    $interval(function() {
      if ($rootScope.user) {
        AjaxFactory.get($rootScope.lastGrabbed).then(function(results) {
          $scope.messageCount = results.messageCount;
          $rootScope.postCount = results.postCount;
        });
      }
    }, 2000);

  $scope.$on("destroy", function() {
    console.log('test');
  })

  $rootScope.$on('$stateChangeSuccess', function() {
    $scope.user = AuthService.getUser();
  });

  $scope.$on('userUpdate', function() {
    $scope.user = AuthService.getUser();
  });
});
