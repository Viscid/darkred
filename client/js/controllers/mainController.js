angular.module('darkred').controller('mainController', function($scope, $state, $rootScope, $timeout, PostFactory) {
  if (!$rootScope.user) { $state.go('login'); } else {

  $scope.postFunction = function() {
    PostFactory.getPosts().then(function(results) {
      $scope.threads = results.threads;
    });
  };

  $scope.postFunction();

}

})
