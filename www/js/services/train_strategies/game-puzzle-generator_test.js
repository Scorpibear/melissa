'use strict';

describe('gamePuzzleGenerator service', function () {
  var gamePuzzleGenerator;
  var base = {pgn: "", m: "", "n": 0, "c": "b", "t": "wb", s: [
    {m: "e4", "n": 1, "c": "w", s: [
      {m: "e6", n: 1, s: [
        {m: "d4"}
      ]}
    ]}  
  ]};
  var baseProvider = {getStart: function() {return base;}}

  beforeEach(module('melissa.services'));

  beforeEach(module(function($provide) {
    $provide.value("baseProvider", baseProvider);
  }));

  beforeEach(inject(function (_gamePuzzleGenerator_) {
      gamePuzzleGenerator = _gamePuzzleGenerator_;
  }));



  describe('getNew', function () {
    it('should get the first position', function () {
      var puzzle = gamePuzzleGenerator.getNew();
      expect(puzzle.position).toEqual("");
    });
    it('should get the next position of the same color', function() {
      gamePuzzleGenerator.getNew();
      var puzzle = gamePuzzleGenerator.getNew();
      expect(puzzle.position).toEqual("1.e4 e6");
    })
  });
  describe('reset', function() {
    it('should activate the most puzzled game', function() {
      gamePuzzleGenerator.reset();
      //expect???
    })
  })
});
