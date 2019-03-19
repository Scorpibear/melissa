'use strict';

angular.module('melissa.bestGames', ['ngRoute', 'melissa.messages', 'melissa.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/js/best-games', {
        templateUrl: 'js/best-games/best-games.html'
    });
  }])
  .constant('chessGame', new Chess())
  .value('movesInterval', 500)
  .controller('BestGamesController', ['$scope', 'chessGame', '$timeout', 'gamesToLearn', 'movesInterval', 'puzzleBuilder', 'messages',
    'learningProgress', 'trainingSession', 'pgnConverter', function(
    $scope, chessGame, $timeout, gamesToLearn, movesInterval, puzzleBuilder, messages, learningProgress, trainingSession, pgnConverter) {
    const movesToTrain = 10;
    const plyToTrain = movesToTrain * 2;
    $scope.training = {compactPgn: "", numberOfCorrectAnswers: 0, numberOfAnswers: 0, session: trainingSession};
    $scope.replayMove = function() {
      var nextMove = $scope.getNextMove();
      if(nextMove) {
        chessGame.move(nextMove);
        try {
          $scope.displayPosition();
          $scope.replayGame();
        } catch(err) {
          // just stop there, as we could be on another page now, no need to proceed
        }
      } else {
        $scope.train();
      }
    }
    $scope.displayPosition = () => {
      $scope.board.orientation(replayGame.color);
      $scope.board.position(chessGame.fen());
      $scope.training.compactPgn = pgnConverter.shortenPgn(chessGame.pgn());
    }
    $scope.replayGame = function() {
      $timeout($scope.replayMove, movesInterval);
    }
    let replayGame = null;
    let trainGame = null;
    let trainIndex = 0;
    let replayIndex = 0;
    $scope.start = function() {
      chessGame.reset();
      trainingSession.start(movesToTrain);
      const game = gamesToLearn.getGame({minPly: plyToTrain});
      if(game) {
        trainIndex = (game.moves.length - game.trainIndex >= plyToTrain) ? game.trainIndex : 
          game.moves.length - plyToTrain + (game.trainIndex + game.moves.length)%2;
        replayGame = {moves: game.moves.slice(0, trainIndex - 1), color: game.color};
        trainGame = {moves: game.moves.slice(0, trainIndex + plyToTrain - 1), color: game.color};
        replayIndex = 0;
        $scope.replayGame();
      } else {
        $scope.training.status = messages.get("Good job, no more puzzles, have a rest!");
      }
    };
    $scope.getNextMove = function() {
      var move = replayGame.moves[replayIndex++];
      return move;
    }
    $scope.train = () => {
      Object.assign($scope.training,  {numberOfCorrectAnswers: 0, numberOfAnswers: 0});
      $scope.createPuzzle();
      $scope.showPuzzle();
    }
    $scope.createPuzzle = () => {
      if(trainIndex < trainGame.moves.length) {
        const moves = trainGame.moves.slice(0, trainIndex)
        const thePuzzle = puzzleBuilder.buildFromPgn(moves, trainGame.moves[trainIndex]);
        $scope.training.status = messages.get("What is the best move?");
        $scope.training.puzzle = thePuzzle;
      } else {
        $scope.training.puzzle = null;
        $scope.training.status = messages.get("Good job, no more puzzles, have a rest!");
      }
    }
    $scope.showPuzzle = () => {
      if($scope.training.puzzle) {
        chessGame.load_pgn($scope.training.puzzle.position);
        $scope.displayPosition();
        $scope.training.solvedFromFirstTry = true;
      }
    }
    $scope.registerCorrectAnswer = () => {
      $scope.training.status = messages.correctAnswer();
      if($scope.training.solvedFromFirstTry) {
        learningProgress.markAsLearnt($scope.training.puzzle);
        trainingSession.register({correct: true});
      } else {
        trainingSession.register({correct: false});
      }
      $scope.training.numberOfCorrectAnswers = trainingSession.getNumberOfCorrectAnswers();
      $scope.training.numberOfAnswers = trainingSession.getNumberOfAnswers();
      $scope.$apply();
      $timeout($scope.showTheNextPuzzle, movesInterval);
    }
    $scope.showTheNextPuzzle = () => {
      trainIndex+=2;
      $scope.createPuzzle();
      $scope.showPuzzle();
    }
    $scope.start();
  }]);
