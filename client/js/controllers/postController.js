angular.module('darkred').controller('postController', function($state, $rootScope, $stateParams, PostFactory, $scope) {

  $scope.getPost = function() {
    PostFactory.getSinglePost($stateParams.postId).then(function(post) {
      $scope.post = post;
    });
  }

  $scope.getPost();

  function refresh() {
    $state.go('post', {
      postId: $scope.post._id
    }, {
      reload: true
    })
  }

  $scope.postFunction = function() {
    PostFactory.getSinglePost($stateParams.postId).then(function(post) {
      $scope.getPost();
      refresh();
    });
  }
});
