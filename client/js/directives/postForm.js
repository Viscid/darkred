angular.module('darkred').directive('postForm', ['PostFactory', function(PostFactory) {
  return {
    restrict: 'E',
    templateUrl: './partials/postFormDirective.html',
    link: function(scope, element) {
      scope.newPost = function(body) {
        console.log(scope);
        if (scope.id) {
          PostFactory.reply(scope.id, body).then(function() {
            scope.postFunction();
          });
        } else {
          PostFactory.post(body).then(function() {
            scope.postFunction();
          });
        }
      }
    },
    scope: {
      postFunction: "&",
      id: "@"
    }
  }
}]);
