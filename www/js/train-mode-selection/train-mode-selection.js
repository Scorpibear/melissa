'use strict';

angular.module('melissa.trainModeSelection', ['ngRoute', 'melissa.messages', 'melissa.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/js/train-mode-selection', {
        templateUrl: 'js/train-mode-selection/train-mode-selection.html'
    });
  }])
  .controller('TrainModeSelectionController', ['$scope', 'trainMode', '$location', 'puzzleProvider', 'trainingSession', function ($scope, trainMode, $location, puzzleProvider, trainingSession) {
    $scope.startBestMovesTraining = function(){
      trainMode.bestMoves();
      var puzzlesToTrain = 10;
      puzzleProvider.reset();
      trainingSession.start(puzzlesToTrain);
      $location.url('/js/train');
    }
    $scope.startBestGamesTraining = function() {
      trainMode.bestGames();
      puzzleProvider.reset();
      trainingSession.start();
      $location.url('/js/best-games');
    }
    $scope.startWatchBestPlay = function() {
      $location.url('/js/watch-games');
    }
  }]);
