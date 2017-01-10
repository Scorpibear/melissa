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
      $scope.startTraining(puzzlesToTrain);
    }
    $scope.startBestGamesTraining = function() {
      trainMode.bestGames();
      $scope.startTraining();
    }
    $scope.startTraining = function(maxPuzzlesToTrainInSession) {
      puzzleProvider.reset();
      trainingSession.start(maxPuzzlesToTrainInSession);
      $location.url('/js/train');
    }
  }]);
