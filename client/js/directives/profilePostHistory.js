angular.module('darkred').directive('postHistory', ['PostFactory', function(PostFactory) {
  return {
    restrict: 'E',
    scope: {
      user: '='
    },
    link: function(scope, element) {

      scope.$watch('user', function(user) {
        if(user) {
              PostFactory.getPostHistory(user._id).then(function(postHistory) {
                scope.postHistory = postHistory;
              });
        }

      });

    },
    templateUrl: './js/partials/postHistoryDirective.html'
  }
}]);
