'use strict';

describe('puzzleGenerator service', function () {
  var puzzleGenerator;
  var continuousPuzzleGenerator = {getNew: function(){}};
  var gamePuzzleGenerator = {getNew: function(){}, reset: function(){}};
  var learningProgress = {isLearnt: function(){}};
  var isGame = false;
  var trainMode = {isGame: function(){return isGame;}};

  beforeEach(module('melissa.services'));
  beforeEach(module(function ($provide) {
    $provide.value("continuousPuzzleGenerator", continuousPuzzleGenerator);
    $provide.value("gamePuzzleGenerator", gamePuzzleGenerator);
    $provide.value("trainMode", trainMode);
  }));
  beforeEach(inject(function(_puzzleGenerator_) {
    puzzleGenerator = _puzzleGenerator_;
  }));

  describe('getNew', function () {

    it('uses getNew from continuousPuzzleGenerator if trainMode is "continuous"', function() {
      isGame = false;
      spyOn(continuousPuzzleGenerator, 'getNew');
      puzzleGenerator.getNew();
      expect(continuousPuzzleGenerator.getNew).toHaveBeenCalled();
    });
    it('uses getNew from gamePuzzleGenerator if trainMode is "game"', function() {
      isGame = true;
      spyOn(gamePuzzleGenerator, 'getNew');
      puzzleGenerator.getNew();
      expect(gamePuzzleGenerator.getNew).toHaveBeenCalled();
    })
  });
  describe('reset', function() {
    it('calls reset from specific generator', function() {
      isGame = true;
      spyOn(gamePuzzleGenerator, 'reset');
      puzzleGenerator.reset();
      expect(gamePuzzleGenerator.reset).toHaveBeenCalled();
    })
  })
});
