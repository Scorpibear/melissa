'use strict';
describe('ideaTester', function() {
  var ideaTester;
  var learningProgress = {isLearnt: function() {}};
  var baseIterator = {getBestAnswer: function() {}};
  var puzzleBuilder = {buildFromPgn: function() {}};
  
  beforeEach(module('melissa.services'));
  beforeEach(module(function ($provide) {
    $provide.value('learningProgress', learningProgress);
    $provide.value('baseIterator', baseIterator);
    $provide.value('puzzleBuilder', puzzleBuilder);
  }));
  beforeEach(inject(function (_ideaTester_) {
    ideaTester = _ideaTester_;
  }));
  describe('isGoodIdea', function() {
    it('returns false if idea was not provided', function() {
      expect(ideaTester.isGoodIdea()).toBeFalsy();
    })
    it('returns false when positions is learnt', function() {
      spyOn(learningProgress, 'isLearnt').and.returnValue(true);
      expect(ideaTester.isGoodIdea({pgn:[]})).toBeFalsy();
    });
    it('returns true when position is not learnt', function() {
      spyOn(learningProgress, 'isLearnt').and.returnValue(false);
      spyOn(baseIterator, 'getBestAnswer').and.returnValue('e4');
      expect(ideaTester.isGoodIdea({pgn:[]})).toBeTruthy();
    });
    it('pass pgn and bestMove to puzzleBuilder', function() {
      spyOn(learningProgress, 'isLearnt');
      spyOn(baseIterator, 'getBestAnswer').and.returnValue('e6');
      spyOn(puzzleBuilder, 'buildFromPgn');
      var idea = {pgn: ['e4']};
      ideaTester.isGoodIdea(idea);
      expect(puzzleBuilder.buildFromPgn).toHaveBeenCalledWith(idea.pgn, 'e6');
    });
    it('returns false when idea has no best answer', function() {
      spyOn(learningProgress, 'isLearnt').and.returnValue(false);
      spyOn(baseIterator, 'getBestAnswer').and.returnValue(undefined);
      expect(ideaTester.isGoodIdea({pgn:['a3','e5','Nc3']})).toBeFalsy();
    });
    it('learningProgress.isLearnt uses output of puzzleBuilder', function() {
      var puzzle = {position: 'aaa', answer: 'bbb'};
      spyOn(learningProgress, 'isLearnt');
      spyOn(baseIterator, 'getBestAnswer').and.returnValue('e4');
      spyOn(puzzleBuilder, 'buildFromPgn').and.returnValue(puzzle);
      ideaTester.isGoodIdea({pgn: []});
      expect(learningProgress.isLearnt).toHaveBeenCalledWith(puzzle);
    });
  });
});
