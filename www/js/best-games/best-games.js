'use strict';

angular.module('melissa.bestGames', ['ngRoute', 'melissa.messages', 'melissa.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/js/best-games', {
        templateUrl: 'js/best-games/best-games.html'
    });
  }])
  .constant('chessGame', new Chess())
  .value('movesInterval', 500)
  .controller('BestGamesController', ['$scope', 'chessGame', '$timeout', 'gamesToLearn', 'movesInterval', 
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
      game = gamesToLearn.getGame();
      $scope.next();
    };
    $scope.getNextMove = function() {
      var move = game.moves.shift();
      return move;
    }
    $scope.start();
  }]);
