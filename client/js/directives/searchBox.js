angular.module('darkred').directive('searchBox', ['$state', '$stateParams', function($state, $stateParams) {
  return {
    restrict: 'E',
    templateUrl: './js/partials/searchBoxDirective.html',
    link: function(scope, element) {
      var timeout;
      scope.$watch($stateParams.searchTerm, function(newValue) {
        scope.searchTerm = $stateParams.searchTerm;
      })
      scope.search = function(searchTerm) {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          if (!scope.searchTerm) {
            $state.go('main');
          } else {
            $state.go('search', {searchTerm: scope.searchTerm});
          }
        }, 500);
      }

      scope.clearSearch = function() {
        scope.searchTerm = undefined;
        $state.go('main');
      }
    }
  }


}]);
