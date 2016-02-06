angular.module('darkred').directive('thread', ['PostFactory', function(PostFactory) {

  return {
    restrict: 'E',
    templateUrl: './partials/threadDirective.html',
    link: function(scope) {
      scope.$watch('threadId', function(newval, oldval) {

        scope.replies = PostFactory.getReplies(scope.threadId);
        if (scope.replies) {
          scope.hasReplies = true;
        }
        
      })


    },
    scope: {
      threadId: '@',
      author: '@',
      date: '@',
      body: '@'
    }
  };

}]);
