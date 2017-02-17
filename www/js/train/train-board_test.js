'use strict';

describe('trainBoard', function() {
  var $compile, $rootScope, $window, trainBoardElement, boardConfig;

  beforeEach(module('melissa.train'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$window_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.showNextPuzzle = function(){};
    $rootScope.training = {puzzle:{answer: ''}};
    $window = _$window_;
    $window.ChessBoard = function(id, boardConfigInput){boardConfig = boardConfigInput; return {position: function(){}}};
    trainBoardElement = '<div><div id="train-board" melissa-train-board></div></div>';
  }));
  describe('link function behavior', function(){
    it('Replaces the element with the appropriate content', function() {
      spyOn($window, 'ChessBoard');
      var element = $compile(trainBoardElement)($rootScope);
      expect($window.ChessBoard).toHaveBeenCalled();
    });
    it('does not define board if no ChessBoard', function() {
      $window['ChessBoard'] = undefined;
      var element = $compile(trainBoardElement)($rootScope);
      expect($rootScope.board).toBe(undefined);
    });
  });

  describe('onDragStart', function() {
    it('returns undefined by default', function() {
      var element = $compile(trainBoardElement)($rootScope);
      expect(boardConfig.onDragStart()).toBe(undefined); // exact match
    })
    it('returns false if orientation is white but piece is black', function() {
      var element = $compile(trainBoardElement)($rootScope);
      expect(boardConfig.onDragStart('source','black','position','white')).toBe(false); // exact match
    });
    it('returns false if orientation is black but piece is white', function() {
      var element = $compile(trainBoardElement)($rootScope);
      expect(boardConfig.onDragStart('source','white','position','black')).toBe(false); // exact match
    });
    it('returns undefined if orientation is black but piece is black', function() {
      $compile(trainBoardElement)($rootScope);
      expect(boardConfig.onDragStart('source','black','position','black')).toBe(undefined); // exact match
    });
  });

  describe('onDrop', function() {
    it('returns undefined if answer is correct', function() {
      $rootScope.training.puzzle.answer = 'e4';
      $rootScope.registerCorrectAnswer = function(){};
      $compile(trainBoardElement)($rootScope);
      expect(boardConfig.onDrop('e2','e4')).toBe(undefined);
    });
    it('returns snapback if source equals target', function() {
      expect(boardConfig.onDrop('e2', 'e2')).toBe('snapback');
    });
    it('returns snapback if answer does not match', function() {
      $rootScope.training.puzzle.answer = 'e6';
      $compile(trainBoardElement)($rootScope);
      expect(boardConfig.onDrop('e7', 'e5')).toBe('snapback');
    });
  });

  describe('onSnapEnd', function() {
    it('resets position', function() {
      $compile(trainBoardElement)($rootScope);
      spyOn($rootScope.board, 'position');
      boardConfig.onSnapEnd();
      expect($rootScope.board.position).toHaveBeenCalled();
    })
  })
});
