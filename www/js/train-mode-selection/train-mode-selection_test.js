'use strict';

describe('TrainModeSelection controller', function() {
  var $controller;

 beforeEach(module('melissa.trainModeSelection'));

  beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

  describe('startTraining', function() {
    it('reset puzzles', function() {
      var puzzleProvider = {reset: function(){}};
      spyOn(puzzleProvider, 'reset');
      var $scope = {};
      $controller('TrainModeSelectionController', {$scope: $scope, puzzleProvider: puzzleProvider});

      $scope.startTraining();

      expect(puzzleProvider.reset).toHaveBeenCalled();
    });
    it('starts training session', function() {
      var $scope = {};
      var trainingSession = {start: function() {}};
      spyOn(trainingSession, 'start');
      $controller('TrainModeSelectionController', {$scope: $scope, trainingSession: trainingSession});
      $scope.startTraining();
      expect(trainingSession.start).toHaveBeenCalled();
    });
  });
  describe('startBestMovesTraining', function() {
    it('bestMoves starts session with 10 puzzles', function() {
      var $scope = {};
      var trainingSession = {start: function() {}};
      spyOn(trainingSession, 'start');
      $controller('TrainModeSelectionController', {$scope: $scope, trainingSession: trainingSession});
      $scope.startBestMovesTraining();
      expect(trainingSession.start).toHaveBeenCalledWith(10);
    });
  });
  describe('startWatchBestPlay', function() {
    it('play games', function() {
      var $scope = {};
      var $location = {url: function() {}};
      spyOn($location, 'url');
      $controller('TrainModeSelectionController', {$scope: $scope, $location: $location});
      $scope.startWatchBestPlay();
      expect($location.url).toHaveBeenCalledWith('/js/watch-games');
    })
  })
});
