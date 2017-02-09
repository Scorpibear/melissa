'use strict';

describe('gamesToLearn', function() {
  var gamesToLearn = null;
  var baseIterator = {getBestPgn: function(){}};
  var teacher = {getListOfPgnsToLearn: function() {}};
  
  beforeEach(module('melissa.services'));
  beforeEach(module(function($provide) {
    $provide.value("baseIterator", baseIterator);
    $provide.value("teacher", teacher);
  }));
  beforeEach(inject(function (_gamesToLearn_) {
    gamesToLearn = _gamesToLearn_;
  }));

  describe('getGame', function() {
    it('returns array of moves', function() {
      spyOn(baseIterator, 'getBestPgn').and.returnValue(['e4', 'e6', 'Nf3']);
      var game = gamesToLearn.getGame();
      expect(game.moves).toEqual(['e4', 'e6', 'Nf3']);
    });
    it('asks teacher what move to learn', function() {
      var teacherAdvice = ['e4', 'c5'];
      spyOn(teacher, 'getListOfPgnsToLearn').and.returnValue([teacherAdvice]);
      spyOn(baseIterator, 'getBestPgn');
      gamesToLearn.getGame();
      expect(baseIterator.getBestPgn).toHaveBeenCalledWith(teacherAdvice);
    });
    it('returns different gameMoves in consequent calls', function() {
      spyOn(baseIterator, 'getBestPgn').and.returnValues([['e4','e6'],['e4','e5']]);
      var game1 = gamesToLearn.getGame();
      var game2 = gamesToLearn.getGame();
      expect(game2).not.toEqual(game1);
    });
  });
});
