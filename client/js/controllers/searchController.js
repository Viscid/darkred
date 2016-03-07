angular.module('darkred').controller('searchController', function($scope, $stateParams, SearchFactory, $state) {
  if ($stateParams.searchTerm) {
    SearchFactory.search($stateParams.searchTerm).then(function(searchResults) {
      $scope.searchResults = searchResults;
    });

  } else {
    $state.go('main');
  }

});
