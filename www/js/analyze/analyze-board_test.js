'use strict';

describe('analyzeBoard', function() {
  var $compile, $rootScope, $window, analyzeBoardElement, boardConfig, analyzeChessGame;

  beforeEach(module('melissa.analyze'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _analyzeChessGame_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.registerPositionChange = function(){/* a stub */};
    $window = _$window_;
    $window.ChessBoard = function(id, boardConfigInput){
      boardConfig = boardConfigInput;
      return jasmine.createSpyObj('board', ['position']);
    };
    analyzeBoardElement = '<div><div id="analyze-board" melissa-analyze-board></div></div>';
    analyzeChessGame = _analyzeChessGame_;
  }));

  describe('link function behavior', function(){
    it('Replaces the element with the appropriate content', function() {
      spyOn($window, 'ChessBoard');
      $compile(analyzeBoardElement)($rootScope);
      expect($window.ChessBoard).toHaveBeenCalled();
    });
    it('does not define board if no ChessBoard', function() {
      $window['ChessBoard'] = undefined;
      $compile(analyzeBoardElement)($rootScope);
      expect($rootScope.board).toBe(undefined);
    });
  });

  describe('onDrop', function() {
    beforeEach(() => {
      analyzeChessGame.reset();
    })
    it('returns undefined if answer is correct', function() {
      $compile(analyzeBoardElement)($rootScope);
      expect(boardConfig.onDrop('e2','e4')).toBe(undefined);
    });
    it('returns snapback if answer does not match', function() {
      spyOn(analyzeChessGame, 'move').and.returnValue(null);
      $compile(analyzeBoardElement)($rootScope);
      expect(boardConfig.onDrop('e7', 'e5')).toBe('snapback');
    });
  });
});
