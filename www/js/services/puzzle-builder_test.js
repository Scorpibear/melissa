'use strict';

describe("puzzleBuilder", function () {
  var puzzleBuilder;

  beforeEach(module("melissa.services"));
  beforeEach(inject(function (_puzzleBuilder_) {
    puzzleBuilder = _puzzleBuilder_;
  }));

  describe("buildFromPositionObject", function () {
    it("uses move with number", function () {
      var positionObject = {pgn: "1.d4", m: 'd4', n: 1, c: 'w', s: [{m: 'Nf6', n: 1, c: 'b'}]};
      var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
      expect(puzzle).toEqual(new Puzzle("1.d4", "Nf6"));
    });
    it("return null if no subnodes", function () {
      var puzzle = puzzleBuilder.buildFromPositionObject({pgn: "1.d4", m: 'd4', n: 1, c: 'w', s: []});
      expect(puzzle).toBeNull();
    });
    it("second move correctly build", function () {
      var puzzle = puzzleBuilder.buildFromPositionObject({
        pgn: '1.Nf3 c5 2.e4',
        m: 'e4',
        n: 2,
        c: 'w',
        s: [{m: 'd6', n: 2, c: 'b'}]
      });
      expect(puzzle).toEqual(new Puzzle("1.Nf3 c5 2.e4", "d6"));
    });
    it("returns null if s is not specified", function () {
      var puzzle = puzzleBuilder.buildFromPositionObject({pgn: ""});
      expect(puzzle).toBeNull();
    });
    it("return null if positionObject is null", function() {
      var puzzle = puzzleBuilder.buildFromPositionObject(null);
      expect(puzzle).toBeNull();
    });
  });
  describe('buildFromPgn', function() {
    it("works for empty pgn", function() {
      expect(puzzleBuilder.buildFromPgn([],'e4')).toEqual(new Puzzle('', 'e4'));
    });
    it("add number", function() {
      expect(puzzleBuilder.buildFromPgn(['e4'], 'e6')).toEqual(new Puzzle('1.e4', 'e6'));
    });
    it('black move separated with space', function() {
      expect(puzzleBuilder.buildFromPgn(['e4','e6'], 'Nf3')).toEqual(new Puzzle('1.e4 e6', 'Nf3'));
    });
    it('increase numbers', function() {
      expect(puzzleBuilder.buildFromPgn(['e4','e6','Nf3','Nf6','Bc4'], 'Bc5')).toEqual(new Puzzle('1.e4 e6 2.Nf3 Nf6 3.Bc4', 'Bc5'));
    });
  });
});