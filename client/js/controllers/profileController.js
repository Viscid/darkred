angular.module('darkred').controller('profileController', function($stateParams, ProfileFactory, $scope, MessageFactory) {

ProfileFactory.getProfile($stateParams.username).then(function(profile) {
  $scope.profile = profile;
});



$scope.sendMessage = function(recipientId, messageBody) {

  MessageFactory.sendMessage(recipientId, messageBody).then(function(data) {
    $scope.messageBody = "Wheeeeeeeeeeeeeeeeeeeeeeeee!";
        setTimeout(function() {
          $scope.$apply(function () {
            $scope.messageBody = "";
          });
        }, 500);
  });

}

});
