'use strict';

describe('notLearntPuzzleGenerator', function () {
  var notLearntPuzzleGenerator;
  var puzzle = {position: '', answer: 'e4'};
  var teacher = {getListOfPgnsToLearn: function(){}};
  var puzzleBuilder = {buildFromPgn: function(){}};
  var baseIterator = {getBestMoveSync: function(){}};

  beforeEach(module('melissa.services'));
  beforeEach(module(function($provide) {
    $provide.value("teacher", teacher);
    $provide.value("puzzleBuilder", puzzleBuilder);
    $provide.value("baseIterator", baseIterator);
  }));
  beforeEach(inject(function(_notLearntPuzzleGenerator_){
    notLearntPuzzleGenerator = _notLearntPuzzleGenerator_;
  }))
  describe('getNew', function() {
    it('returns undefined if no puzzles in backlog', function() {
      expect(notLearntPuzzleGenerator.getNew()).toEqual(undefined);
    });
    it('returns puzzle which was firstly built', function() {
      spyOn(teacher, 'getListOfPgnsToLearn').and.returnValue([[]]);
      var puzzle = {position: '', answer: 'e4'};
      spyOn(puzzleBuilder, 'buildFromPgn').and.returnValue(puzzle);
      notLearntPuzzleGenerator.reset();
      expect(notLearntPuzzleGenerator.getNew()).toEqual(puzzle);
    })
  });
  describe('reset', function() {
    it('calls teacher.getListOfPgnsToLearn()', function() {
      spyOn(teacher, 'getListOfPgnsToLearn');
      notLearntPuzzleGenerator.reset();
      expect(teacher.getListOfPgnsToLearn).toHaveBeenCalled();
    });
    it('uses baseIterator.getBestMoveSync result to build the puzzle', function() {
      spyOn(teacher, 'getListOfPgnsToLearn').and.returnValue([['d4']]);
      spyOn(baseIterator, 'getBestMoveSync').and.returnValue('Nf6');
      spyOn(puzzleBuilder, 'buildFromPgn');
      notLearntPuzzleGenerator.reset();
      expect(puzzleBuilder.buildFromPgn).toHaveBeenCalledWith(['d4'], 'Nf6');
    })
  })
});
