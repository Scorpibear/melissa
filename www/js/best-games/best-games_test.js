describe('BestGamesController', function() {
  let $controller, chessGame;
  let $scope = {board: {orientation: () => {}, position: () => {}}};

  beforeEach(module('melissa.bestGames'));

  beforeEach(inject(function (_$controller_, _chessGame_) {
      $controller = _$controller_;
      chessGame = _chessGame_;
      $controller('BestGamesController', {$scope});
  }));

  describe('start', function() {
    it('starts replaying games', function() {
      spyOn($scope, 'replayGame').and.stub();
      $scope.start();
      expect($scope.replayGame).toHaveBeenCalled();
    });
  });
  describe('replayMove', () => {
    const move = {san: 'Nf6'};

    it('gets next move', () => {
      spyOn($scope, 'getNextMove').and.stub();
      $scope.replayMove();
      expect($scope.getNextMove).toHaveBeenCalled();
    });
    it('makes move in chessGame', () => {
      spyOn($scope, 'getNextMove').and.returnValue(move);
      spyOn(chessGame, 'move').and.stub();
      $scope.replayMove();
      expect(chessGame.move).toHaveBeenCalledWith(move);
    });
    it('displays position', () => {
      spyOn($scope, 'displayPosition');
      $scope.replayMove();
      expect($scope.displayPosition).toHaveBeenCalled();
    });
    it('continues replay if next move still exists', () => {
      spyOn($scope, 'getNextMove').and.returnValue(move);
      spyOn($scope, 'replayGame').and.stub();
      $scope.replayMove();
      expect($scope.replayGame).toHaveBeenCalled();
    });
    it('starts training if no more moves', () => {
      spyOn($scope, 'getNextMove').and.returnValue(null);
      spyOn($scope, 'train').and.stub();
      $scope.replayMove();
      expect($scope.train).toHaveBeenCalled();
    })
  });
});
