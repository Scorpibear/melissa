describe('WatchGamesController', function() {
  let $controller;
  const stub = () => {};
  let board =  {position: stub, orientation: stub};
  let $scope = {makeMove: stub, next: stub, board, getNextMove: () => 'd4'};
  let chessGame = {reset: stub, move: stub, fen: stub};
  const game = {color: 'w'};
  let $timeout = stub;
  let gamesToLearn = {getGame: stub};
  let movesInterval;

  beforeEach(module('melissa.watchGames'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
    $controller('WatchGamesController', {$scope, chessGame, $timeout, gamesToLearn, movesInterval});
  }));
  describe('start', () => {
    it('start showing the next move', () => {
      spyOn($scope, 'next').and.stub();
      $scope.start();
      expect($scope.next).toHaveBeenCalled();
    });
  });
  describe('makeMove', () => {
    beforeEach(() => {
      $scope.start();
    });
    it('changing the board position', () => {
      const fen = 'stub fen value';
      spyOn($scope.board, 'position').and.stub();
      spyOn($scope, 'getNextMove').and.returnValue('d4');
      spyOn(chessGame, 'fen').and.returnValue(fen);
      $scope.makeMove(game);
      expect($scope.board.position).toHaveBeenCalledWith(fen);
    });
  })
});
