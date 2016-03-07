angular.module('darkred').factory('SearchFactory', ['$http', '$q', function($http, $q) {

function search(searchTerm) {
  var deferred = $q.defer();

  $http.post('/post/search/', {
    searchTerm: searchTerm
  }).then(function(data) {
    if (data.data && data.data.results)
    {
    deferred.resolve(data.data.results);
    }

  }, function(error) {
    console.log(data);
    deferred.reject(error);
  })

  return deferred.promise;
}

return {
  search: search
}


}]);
