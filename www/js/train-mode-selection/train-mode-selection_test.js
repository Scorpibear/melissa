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
      let $scope = {};
      let trainingSession = {start: () => {}};
      spyOn(trainingSession, 'start');
      $controller('TrainModeSelectionController', {$scope: $scope, trainingSession: trainingSession});
      $scope.startTraining();
      expect(trainingSession.start).toHaveBeenCalled();
    });
  });
  describe('startBestMovesTraining', function() {
    it('bestMoves starts session with 10 puzzles', function() {
      let $scope = {};
      let trainingSession = {start: () => {}};
      spyOn(trainingSession, 'start');
      $controller('TrainModeSelectionController', {$scope: $scope, trainingSession: trainingSession});
      $scope.startBestMovesTraining();
      expect(trainingSession.start).toHaveBeenCalledWith(10);
    });
  });
})