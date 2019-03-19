describe('BestGamesController', function() {
  let $controller, chessGame, messages, trainingSession, gamesToLearn;
  let $scope = {$apply: () => {}, board: {orientation: () => {}, position: () => {}}};

  beforeEach(module('melissa.bestGames'));

  beforeEach(inject(function (_$controller_, _chessGame_, _messages_, _trainingSession_, _gamesToLearn_) {
      $controller = _$controller_;
      chessGame = _chessGame_;
      messages = _messages_;
      trainingSession = _trainingSession_;
      gamesToLearn = _gamesToLearn_;
      $controller('BestGamesController', {$scope});
  }));

  describe('start', function() {
    it('starts replaying games', function() {
      spyOn($scope, 'replayGame').and.stub();
      $scope.start();
      expect($scope.replayGame).toHaveBeenCalled();
    });
    it('displays message that no more puzzles if no games to train found', () => {
      spyOn(gamesToLearn, 'getGame').and.returnValue(null);
      $scope.start();
      expect($scope.training.status).toBe(messages.get("Good job, no more puzzles, have a rest!"));
    })
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
  describe('registerCorrectAnswer', () => {
    it('displays message that answer is correct', () => {
      spyOn(messages, 'correctAnswer').and.returnValue('Good!');
      $scope.registerCorrectAnswer();
      expect($scope.training.status).toBe('Good!');
    })
  });
  describe('showTheNextPuzzle', () => {
    it('creates puzzle', () => {
      spyOn($scope, 'createPuzzle').and.stub();
      $scope.showTheNextPuzzle();
      expect($scope.createPuzzle).toHaveBeenCalled();
    });
    it('shows puzzle', () => {
      spyOn($scope, 'showPuzzle').and.stub();
      $scope.showTheNextPuzzle();
      expect($scope.showPuzzle).toHaveBeenCalled();
    })
  });
  describe('createPuzzle', () => {
    it('set training puzzle to null when training is finished', () => {
      spyOn(trainingSession, 'isInProgress').and.returnValue(false);
      $scope.createPuzzle();
      expect($scope.training.puzzle).toBe(null);
    })
  })
});
