angular.module('darkred', ['ui.router'], function config($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('main', {
    url: '/',
    templateUrl: '/partials/main.html',
    controller: 'mainController'
  });

  /* Authentication Routes */

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/partials/login.html',
    controller: 'loginController'
  });

  $stateProvider.state('register', {
    url: '/register',
    templateUrl: '/partials/register.html',
    controller: 'registerController'
  });

  $stateProvider.state('logout', {
    url: '/logout',
    controller: 'logoutController'
  });

  /* Post Routes */

  $stateProvider.state('post', {
    url: '/post/:postId',
    templateUrl: '/partials/reply.html',
    controller: 'postController'
  })



  $urlRouterProvider.otherwise('/');

})

.run(function($state, $rootScope, AuthService, $window) {
  $rootScope.$on('$viewContentLoading', function() {
    $rootScope.user = AuthService.getUser();
    if (!$rootScope.user) {
      var token = $window.localStorage.getItem('auth-token');
      if (token) {
        AuthService.getUserFromToken(token).then(function() {
          $rootScope.user = AuthService.getUser();
          $rootScope.$broadcast('userUpdate', {user: $rootScope.user});
        })
      }
    }
  })
});
