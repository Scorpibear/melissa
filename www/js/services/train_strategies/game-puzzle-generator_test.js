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
  var baseUpdater = {getStart: function() {return base;}, getBestSubPositions: function() {}}

  beforeEach(module('melissa.services'));

  beforeEach(module(function($provide) {
    $provide.value("baseUpdater", baseUpdater);
    $provide.value("gameCreator", gameCreator);
    $provide.value("puzzleBuilder", puzzleBuilder);
  }));

  beforeEach(inject(function (_gamePuzzleGenerator_) {
      gamePuzzleGenerator = _gamePuzzleGenerator_;
  }));

  describe('getNew', function () {
    it('should get the first position', function () {
      spyOn(gameCreator, 'create').and.returnValue([{pgn: ""}, {pgn: "1.e4 e6"}]);
      gamePuzzleGenerator.reset();
      spyOn(puzzleBuilder, 'buildFromPositionObject').and.returnValue({position: ""});
      var puzzle = gamePuzzleGenerator.getNew();
      expect(puzzle.position).toEqual("");
    });
    it('should get the next position', function () {
      spyOn(gameCreator, 'create').and.returnValue([{pgn: ""}, {pgn: "1.e4 e6"}]);
      gamePuzzleGenerator.reset();
      spyOn(puzzleBuilder, 'buildFromPositionObject').and.returnValue({position: "1.e4 e6"});
      gamePuzzleGenerator.getNew();
      var puzzle = gamePuzzleGenerator.getNew();
      expect(puzzle.position).toEqual("1.e4 e6");
      expect(puzzleBuilder.buildFromPositionObject).toHaveBeenCalledWith({pgn: '1.e4 e6'});
    });
    it('returns null if no active game', function() {
      spyOn(gameCreator, 'create').and.returnValue([]);
      gamePuzzleGenerator.reset();
      expect(gamePuzzleGenerator.getNew()).toEqual(null);
    });
  });
  describe('start', function() {
    var realbaseUpdater = null;
    beforeEach(inject(function (_baseUpdater_) {
      realbaseUpdater = _baseUpdater_;
    }));
    it('should check what game is better if there are several', function() {
      spyOn(gameCreator, 'isBetter');
      spyOn(baseUpdater, 'getBestSubPositions').and.returnValues([{},{}]);
      gamePuzzleGenerator.start();
      expect(gameCreator.isBetter).toHaveBeenCalled();
    });
    it('should request game generation for not the best first move of black', function() {
      spyOn(gameCreator, 'create');
      spyOn(baseUpdater, 'getBestSubPositions').and.returnValues(
        [{pgn: "1.e4"}, {pgn: "1.d4"}],
        [{pgn: "1.e4 e6"}, {pgn: "1.e4 d5"}]
      );
      gamePuzzleGenerator.start();
      expect(baseUpdater.getBestSubPositions).toHaveBeenCalledWith({pgn: '1.e4 d5'});
    });
    it('replace active game if better was found', function() {
      var positionObject = {m: 'e4'};
      spyOn(gameCreator, 'isBetter').and.returnValues(true);
      spyOn(gameCreator, 'create').and.returnValues([],[positionObject]);
      spyOn(baseUpdater, 'getBestSubPositions').and.returnValues([{}, positionObject]);
      spyOn(puzzleBuilder, 'buildFromPositionObject');

      gamePuzzleGenerator.start();

      gamePuzzleGenerator.getNew();
      expect(puzzleBuilder.buildFromPositionObject).toHaveBeenCalledWith(positionObject);
    })
  })
  describe('reset', function() {
    it('calls start', function() {
      spyOn(gamePuzzleGenerator, 'start');
      gamePuzzleGenerator.reset();
      expect(gamePuzzleGenerator.start).toHaveBeenCalled();
    })
  })
});
