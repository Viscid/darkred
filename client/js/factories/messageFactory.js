angular.module('darkred').factory('MessageFactory', ['$q', '$http', function($q, $http) {


function sendMessage(recipientId, messageBody) {
  var deferred = $q.defer();

  $http.post('/message/send', {
    recipient: recipientId,
    body: messageBody
  }).then(function(data) {
    deferred.resolve(data);
  }, function(error) {
    deferred.reject(error);
  });

  return deferred.promise;
}

function getMessages() {
  var deferred = $q.defer();

  $http.get('/message/inbox').then(function(data) {
    deferred.resolve(data.data);
  }, function(error) {
    console.log(error);
    deferred.reject(error);
  });

  return deferred.promise;
}

function checkMessages() {
    var deferred = $q.defer();

    $http.get('/message/check').then(function(data) {
      deferred.resolve(data.data);
    }, function(error) {
s
      deferred.reject(error);
    });

    return deferred.promise;
}

return {
  sendMessage: sendMessage,
  getMessages: getMessages,
  checkMessages: checkMessages
}

}]);
