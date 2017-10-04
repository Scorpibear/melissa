'use strict';

describe('highlighter', function() {
  var highlighter = null;

  beforeEach(module('melissa.train'));

  beforeEach(inject(function(_highlighter_){
    highlighter = _highlighter_;
  }));

  describe('highlightSquares', function() {
    it('calls highlightSquare for each from 2 squares', function() {
      spyOn(highlighter, 'highlightSquare');

      highlighter.highlightSquares(['e2', 'e4']);

      expect(highlighter.highlightSquare).toHaveBeenCalledTimes(2);
    });
  });
});
