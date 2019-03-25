'use strict';

describe('TrainModeSelection controller', function() {
  let $controller;
  let $scope = {};
  let $location = {url: () => {}};
  let trainingSession = {start: () => {}};

  beforeEach(module('melissa.trainModeSelection'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
    $controller('TrainModeSelectionController', {$scope, $location, trainingSession});
  }));
  beforeEach(() => {

  })
  describe('startBestMovesTraining', function() {
    it('bestMoves starts session with 10 puzzles', function() {
      spyOn(trainingSession, 'start');
      $scope.startBestMovesTraining();
      expect(trainingSession.start).toHaveBeenCalledWith(10);
    });
  });
  describe('startWatchBestPlay', function() {
    it('play games', function() {
      spyOn($location, 'url').and.stub();
      $scope.startWatchBestPlay();
      expect($location.url).toHaveBeenCalledWith('/js/watch-games');
    });
  });
  describe('startBestGamesTraining', () => {
    it('goes to /js/best-games', () => {
      spyOn($location, 'url').and.stub();
      $scope.startBestGamesTraining();
      expect($location.url).toHaveBeenCalledWith('/js/best-games');
    });
  });
});
