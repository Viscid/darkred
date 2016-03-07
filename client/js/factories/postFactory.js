angular.module('darkred').factory('PostFactory', ['$http', '$q', function($http, $q) {

  var currentReplies = {};
  var replyOrder;

  function getReplies(id) {
    if (currentReplies && currentReplies[id])
    {
      return currentReplies[id];
    } else {
      return false;
    }
  }

  function getReplyOrder(id) {
    if (replyOrder[id] < 9)
    {
      return replyOrder[id];
    } else {
      return 9;
    }

  }

  function post(body) {
    var deferred = $q.defer();

    $http.post('/post/new', {
      body: body
    }).then(function() {
      deferred.resolve();
    });

    return deferred.promise;
  }

  function reply(parentId, body) {
    var deferred = $q.defer();

    $http.post('/post/reply', {
      parentId: parentId,
      body: body
    }).then(function() {
      deferred.resolve();
    });

    return deferred.promise;
  }

  function getPosts() {
    var deferred = $q.defer();

    $http.get('/post/all').then(function(data) {


        currentReplies = data.data.replyList;
        replyOrder = data.data.replyOrder;

        deferred.resolve({threads: data.data.threads, replies: data.data.replyList, lastGrabbed: data.data.grabbed});
      },
      function(error) {
        console.log('Error: ', error);
        deferred.reject(error);
      });

    return deferred.promise;
  }

  function getSinglePost(postId) {
    var deferred = $q.defer();

    $http.get('/post/thread/' + postId).then(function(data) {

        currentReplies = data.data.replyList;
        deferred.resolve(data.data.post);
      },
      function(error) {
        console.log('Error: ', error);
        deferred.reject(error);
      });

    return deferred.promise;
  }

  function getPostHistory(userId) {
    var deferred = $q.defer();

    $http.get('/post/user/' + userId).then(function(data) {

        postHistory = data.data;
        deferred.resolve(postHistory);
      },
      function(error) {
        console.log('Error: ', error);
        deferred.reject(error);
      });

    return deferred.promise;
  }

  return {
    post: post,
    getPosts: getPosts,
    reply: reply,
    getSinglePost: getSinglePost,
    getReplies: getReplies,
    getReplyOrder: getReplyOrder,
    getPostHistory: getPostHistory
  };



}]);
