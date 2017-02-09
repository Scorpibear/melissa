'use strict';
describe('ideaTester', function() {
  var ideaTester;
  var learningProgress = {isLearnt: function() {}};
  
  beforeEach(module('melissa.services'));
  beforeEach(module(function ($provide) {
    $provide.value('learningProgress', learningProgress);
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
      expect(ideaTester.isGoodIdea({pgn:[]})).toBeTruthy();
    });
  });
});
