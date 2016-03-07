angular.module('darkred').controller('mainController', function($scope, $state, $rootScope, $timeout, PostFactory) {
  if (!$rootScope.user) { $state.go('login'); } else {

  $scope.postFunction = function() {
    $scope.newPosts = 0;
    PostFactory.getPosts().then(function(results) {
      $rootScope.lastGrabbed = results.lastGrabbed;
      $scope.threads = results.threads;
      $scope.newPost = false;
    });
  };

  $scope.togglePostForm = function() {
    $scope.newPost = !$scope.newPost;
  }

  $scope.postFunction();
  $rootScope.$watch('postCount', function(postCount) {
    if (postCount > 0) {
      $scope.newPosts = postCount;
    }
  })
}

})
