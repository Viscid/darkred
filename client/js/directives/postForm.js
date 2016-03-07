angular.module('darkred').directive('postForm', ['PostFactory', '$window', function(PostFactory, $window) {
  return {
    restrict: 'E',
    templateUrl: './js/partials/postFormDirective.html',
    link: function(scope, element) {
      scope.$watch('focused', function(focused) {
        setTimeout(function() {
          var textarea = $window.document.getElementById('newThreadTextarea');
          if (textarea)
          {
            textarea.innerHTML = "";
            textarea.focus();
            if (scope.post && scope.post.body)
            {
              scope.post.body = "";
            }
          }
        }, 25);
      });

      scope.newPost = function(body) {
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
      id: "@",
      focused: "="
    }
  }
}]);
