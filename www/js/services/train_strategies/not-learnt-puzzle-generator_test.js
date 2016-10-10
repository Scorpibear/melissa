'use strict';

describe('notLearntPuzzleGenerator', function () {
  var notLearntPuzzleGenerator;
  var continuousPuzzleGenerator = {getNew: function(){}};
  var learningProgress = {isLearnt: function(){}};
  var puzzle = {position: '', answer: 'e4'};

  beforeEach(module('melissa.services'));
  beforeEach(module(function($provide) {
    $provide.value("continuousPuzzleGenerator", continuousPuzzleGenerator);
    $provide.value("learningProgress", learningProgress);
  }));
  beforeEach(inject(function(_notLearntPuzzleGenerator_){
    notLearntPuzzleGenerator = _notLearntPuzzleGenerator_;
  }))
  describe('getNew', function() {
    it('uses puzzles from continuousPuzzleGenerator', function() {
      
      spyOn(continuousPuzzleGenerator, 'getNew').and.returnValue(puzzle);
      expect(notLearntPuzzleGenerator.getNew()).toEqual(puzzle);
    });
    it('ignores learnt puzzles', function() {
      spyOn(learningProgress, 'isLearnt').and.returnValue(true);
      var callCount = 0;
      spyOn(continuousPuzzleGenerator, 'getNew').and.callFake(function(){
        callCount++;
        return (callCount == 1) ? puzzle : null;
      });
      expect(notLearntPuzzleGenerator.getNew()).toEqual(null);
    });
  })
});
