describe('WatchGamesController', function() {
  let $controller;
  const stub = () => {};
  let $scope = {makeMove: stub, next: stub};
  let chessGame = {reset: stub };
  let $timeout = stub;
  let gamesToLearn = {getGame: stub};
  let movesInterval;

  beforeEach(module('melissa.watchGames'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
    $controller('WatchGamesController', {$scope, chessGame, $timeout, gamesToLearn, movesInterval});
  }));
  describe('start', function() {
    it('start showing the next move', () => {
      spyOn($scope, 'next').and.stub();
      $scope.start();
      expect($scope.next).toHaveBeenCalled();
    });
  });
});
