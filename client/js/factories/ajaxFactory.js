angular.module('darkred').factory('AjaxFactory', ['$q', '$http', function($q, $http) {

  function get(lastGrabbed) {
    var deferred = $q.defer();

    $http.get('/ajax/ihatetheworldandwanttodie?grabbed=' + lastGrabbed).then(function(results) {
      deferred.resolve({messageCount: results.data.messageCount, postCount: results.data.postCount});
    }, function(error) {
      console.log(error);
      deferred.reject(error);
    });

    return deferred.promise;
  }


  return {
    get: get
  }

}]);
