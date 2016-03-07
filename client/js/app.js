angular.module('darkred', ['ui.router'], function config($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'js/partials/main.html',
    controller: 'mainController'
  });

  /* Authentication Routes */

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/partials/login.html',
    controller: 'loginController'
  });

  $stateProvider.state('register', {
    url: '/register',
    templateUrl: 'js/partials/register.html',
    controller: 'registerController'
  });

  $stateProvider.state('logout', {
    url: '/logout',
    controller: 'logoutController'
  });

  /* Post Route */

  $stateProvider.state('post', {
    url: '/post/:postId',
    templateUrl: 'js/partials/post.html',
    controller: 'postController'
  })

  /* User Route */

  $stateProvider.state('profile', {
    url: '/profile/:username',
    controller: 'profileController',
    templateUrl: 'js/partials/profile.html',
  });

  /* Search Route */

  $stateProvider.state('search', {
    url: '/search/:searchTerm',
    controller: 'searchController',
    templateUrl: 'js/partials/search.html',
  });

  /* Messages Route */

    $stateProvider.state('messages', {
      url: '/messages',
      controller: 'messagesController',
      templateUrl: 'js/partials/messages.html',
    });




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
          $rootScope.$broadcast('userUpdate', {
            user: $rootScope.user
          });
        })
      }
    }
  })
});
