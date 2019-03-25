'use strict';

angular.module('melissa.watchGames', ['ngRoute', 'melissa.messages', 'melissa.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/js/watch-games', {
        templateUrl: 'js/watch-games/watch-games.html'
    });
  }])
  .constant('chessGame', new Chess())
  .value('movesInterval', 1000)
  .controller('WatchGamesController', ['$scope', 'chessGame', '$timeout', 'gamesToLearn', 'movesInterval', 
    function($scope, chessGame, $timeout, gamesToLearn, movesInterval) {
    $scope.makeMove = function() {
      var nextMove = $scope.getNextMove();
      if(nextMove) {
        chessGame.move(nextMove);
        try {
          $scope.board.orientation(game.color);
          $scope.board.position(chessGame.fen());
          $scope.next();
        } catch(err) {
          // just stop there, as we could be on another page now, no need to proceed
        }
      } else {
        $scope.start();
      }
    }
    $scope.next = function() {
      $timeout($scope.makeMove, movesInterval);
    }
    var game = null;
    $scope.start = function() {
      chessGame.reset();
      game = gamesToLearn.getGame({minPly: 10});
      $scope.next();
    };
    $scope.getNextMove = function() {
      var move = game.moves.shift();
      return move;
    }
    $scope.start();
  }]);
