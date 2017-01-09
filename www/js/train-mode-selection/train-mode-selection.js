'use strict';

angular.module('melissa.trainModeSelection', ['ngRoute', 'melissa.messages', 'melissa.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/js/train-mode-selection', {
        templateUrl: 'js/train-mode-selection/train-mode-selection.html'
    });
  }])
  .controller('TrainModeSelectionController', ['$scope', 'trainMode', '$location', 'puzzleProvider', function ($scope, trainMode, $location, puzzleProvider) {
    $scope.startBestMovesTraining = function(){
      trainMode.bestMoves();
      $scope.startTraining()
    }
    $scope.startBestGamesTraining = function() {
      trainMode.bestGames();
      $scope.startTraining();
    }
    $scope.startTraining = function() {
      puzzleProvider.reset()
      $location.url('/js/train');
    }
  }]);
