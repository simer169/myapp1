var nameApp = angular.module('starter', ['ionic']); 
nameApp.factory('Movies', function($http) {
  var cachedData; 
  function getData(moviename, callback) { 
    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=62a55f74fd6a31442f635b9a534fa7f7'; 
    $http.get(url + mode + key + name).success(function(data) { 
      cachedData = data.results;
      callback(data.results);
    });
  } 
  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  }; 
});
 
 
nameApp.config(function($stateProvider, $urlRouterProvider) { 
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'templates/list.html',
      controller: 'ListCtrl'
    })
    .state('view', {
      url: '/movie/:movieid',
      templateUrl: 'templates/view.html',
      controller: 'ViewCtrl'
    }); 
  $urlRouterProvider.otherwise("/"); 
});
 
nameApp.controller('ListCtrl', function($scope, $http, Movies) { 
  $scope.movie = {
    name: ''
  } 
  $scope.searchMovieDB = function() { 
    Movies.list($scope.movie.name, function(movies) {
      $scope.movies = movies;
    });     
  };
}); 
nameApp.controller('ViewCtrl', function($scope, $http, $stateParams, Movies) {
  Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
});