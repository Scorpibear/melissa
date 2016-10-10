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
    })
  })
})