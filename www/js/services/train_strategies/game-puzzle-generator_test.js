'use strict';

describe('gamePuzzleGenerator service', function () {
  var gamePuzzleGenerator;
  var gameCreator = {isBetter: ()=>{}, create: ()=>{}};
  var puzzleBuilder = {buildFromPositionObject: ()=>{}};
  var base = {pgn: "", m: "", "n": 0, "c": "b", "t": "wb", s: [
    {m: "e4", "n": 1, "c": "w", s: [
      {m: "e6", n: 1, s: [
        {m: "d4"}
      ]}
    ]}  
  ]};
  var baseProvider = {getStart: function() {return base;}, getBestSubPositions: function() {}}

  beforeEach(module('melissa.services'));

  beforeEach(module(function($provide) {
    $provide.value("baseProvider", baseProvider);
    $provide.value("gameCreator", gameCreator);
    $provide.value("puzzleBuilder", puzzleBuilder);
  }));

  beforeEach(inject(function (_gamePuzzleGenerator_) {
      gamePuzzleGenerator = _gamePuzzleGenerator_;
  }));

  describe('getNew', function () {
    beforeEach(function() {
      spyOn(gameCreator, 'create').and.returnValue([{pgn: ""}, {pgn: "1.e4 e6"}]);
      gamePuzzleGenerator.reset();
    })
    it('should get the first position', function () {
      spyOn(puzzleBuilder, 'buildFromPositionObject').and.returnValue({position: ""});
      var puzzle = gamePuzzleGenerator.getNew();
      expect(puzzle.position).toEqual("");
    });
    it('should get the next position', function () {
      spyOn(puzzleBuilder, 'buildFromPositionObject').and.returnValue({position: "1.e4 e6"});
      gamePuzzleGenerator.getNew();
      var puzzle = gamePuzzleGenerator.getNew();
      expect(puzzle.position).toEqual("1.e4 e6");
    });
  });
  describe('start', function() {
    it('should check what game is better if there are several', function() {
      spyOn(gameCreator, 'isBetter');
      spyOn(baseProvider, 'getBestSubPositions').and.returnValue([{},{}]);
      gamePuzzleGenerator.start();
      expect(gameCreator.isBetter).toHaveBeenCalled();
    });
  })
  describe('reset', function() {
    it('calls start', function() {
      spyOn(gamePuzzleGenerator, 'start');
      gamePuzzleGenerator.reset();
      expect(gamePuzzleGenerator.start).toHaveBeenCalled();
    })
  })
});
