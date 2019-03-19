describe('BestGamesController', function() {
  let $controller;

  beforeEach(module('melissa.bestGames'));

  beforeEach(inject(function (_$controller_) {
      $controller = _$controller_;
  }));

  describe('start', function() {
    it('starts replaying games', function() {
      let $scope = {};
      $controller('BestGamesController', {$scope});
      spyOn($scope, 'replayGame').and.stub();
      $scope.start();
      expect($scope.replayGame).toHaveBeenCalled();
    });
  });
});
