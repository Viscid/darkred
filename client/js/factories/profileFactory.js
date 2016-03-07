angular.module('darkred').factory('ProfileFactory', ['$http', '$q', function($http, $q) {

  function getProfile(username) {
    var deferred = $q.defer();

    $http.get('/profile/' + username).then(function(data) {
        deferred.resolve(data.data);
      },
      function(error) {
        console.log(error);
        deferred.reject(error);
      }
    );

    return deferred.promise;
  }



  return {
    getProfile: getProfile
  };



}]);
