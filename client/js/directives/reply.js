angular.module('darkred').directive('reply', ['PostFactory', 'RecursionHelper', function(PostFactory, RecursionHelper) {

  return {
    restrict: 'E',
    templateUrl: './js/partials/replyDirective.html',
    compile: function(element) {
      return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn) {
        scope.replies = PostFactory.getReplies(scope.id);
        iElement.addClass('highlight' + PostFactory.getReplyOrder(scope.id));
        if (scope.replies) {
          scope.hasReplies = true;
        }
      });
    },
    scope: {
      id: '@',
      author: '@',
      datetime: '@',
      body: '@',
      order: '='
    }
  };

}]);
