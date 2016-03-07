angular.module('darkred').factory('AuthService', ['$q', '$timeout', '$http', 'AuthTokenFactory', '$window',

  function($q, $timeout, $http, AuthTokenFactory, $window) {

    var user = null;

    function isLoggedIn() {
      if (user) {
        return true;
      } else {
        return false;
      }
    }

    function getUser() {
      return user;
    }

    function login(username, password, token) {

      var deferred = $q.defer();

      $http.post('/user/login', {
          username: username,
          password: password,
          token: token
        })
        .then(
          function(data) {
            if (data.status === 200 && data.data.user) {
              user = data.data.user;
              AuthTokenFactory.setToken(data.data.token);
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          },
          function(data) {
            user = false;
            deferred.reject();
          });
      return deferred.promise;
    }

    function getUserFromToken(token) {
      var deferred = $q.defer();

      $http.post('/user/me', {
          token: token
        })
        .then(function(data) {
          if (data.status === 200) {
            user = data.data.user;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        });

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      $http.get('/user/logout')
        .then(
          function(data) {
            user = false;
            AuthTokenFactory.clearToken();

            deferred.resolve();
          },
          function(data) {
            user = false;
            AuthTokenFactory.clearToken();

            deferred.reject();
          });

      return deferred.promise;
    }

    return ({
      isLoggedIn: isLoggedIn,
      getUser: getUser,
      login: login,
      getUserFromToken: getUserFromToken,
      logout: logout,
      register: register
    });

    function register(registrationInfo) {
      var deferred = $q.defer();

      $http.post('/user/register', {
          email: registrationInfo.email,
          username: registrationInfo.username,
          password: registrationInfo.password
        })
        .then(function(data) {
            user = data.data.user;
            console.log(data.data);
            AuthTokenFactory.setToken(data.data.token);
            deferred.resolve();
          },
          function(data) {
            deferred.reject();
          });

      return deferred.promise;
    }

  }

]);

angular.module('darkred').factory('AuthTokenFactory', function AuthTokenFactory($window) {
  var store = $window.localStorage;
  var key = 'auth-token';

  return {
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken
  };

  function getToken() {
    return store.getItem(key);
  }

  function setToken(token) {
    if (token) {
      store.setItem(key, token);
    } else {
      store.removeItem(key);
    }
  }

  function clearToken() {
    store.removeItem(key);
  }
});

angular.module('darkred').factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
  return {
    request: addToken
  };

  function addToken(config) {
    var token = AuthTokenFactory.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }

});
