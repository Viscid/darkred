angular.module('darkred').controller('messagesController', ['$scope', 'MessageFactory', function($scope, MessageFactory) {
  MessageFactory.getMessages().then(function(messages) {
    $scope.messages = messages;
  });
}]);
