angular.module('darkred').controller('logoutController', function(AuthService, $state) {
    AuthService.logout().then(function() {
        $state.go('main', {}, { reload: true });
    } );
});
