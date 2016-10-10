'use strict';

describe('continuousPuzzleGenerator service', function () {
  var continuousPuzzleGenerator;

  beforeEach(module('melissa.services'));

  beforeEach(module(function ($provide) {
    var baseProvider = {
      getStart: function () {
        return {m: '', s: [
          {m: "p1", s: [
            { m: "p2", s: []},
            { m: "p3", s: [
              {m: "p3.1", s: []}
            ]}
          ]}
        ]};
      },
      getBestSubPositions: function (positionObject) {
        var map = {
          '': [{m: "p1", s: [{m: "p1"}]}],
          'p1': [{m: "p2", s:[]}, {m: "p3", s:[{m: "p3.1", s:[]}]}],
          'p2': [],
          'p3': [{m: "p3.1", s: []}]
        }
        return map[positionObject.m];
      }
    };
    var puzzleBuilder = {
      buildFromPositionObject: function (positionObject) {
        return {position: positionObject.m}
      }
    };
    $provide.value("baseProvider", baseProvider);
    $provide.value("puzzleBuilder", puzzleBuilder);
  }));

  beforeEach(inject(function (_continuousPuzzleGenerator_) {
    continuousPuzzleGenerator = _continuousPuzzleGenerator_;
  }));

  describe('getNew', function () {

    it('should get puzzle by positionObject', function () {
      var puzzle = continuousPuzzleGenerator.getNew();
      expect(puzzle).toEqual({position: ""});
    });

    it('should go next level', function () {
      continuousPuzzleGenerator.getNew();
      var puzzle = continuousPuzzleGenerator.getNew();
      expect(puzzle).toEqual({position: "p1"});
    });

    it('should skip positions with empty subpositions array', function() {
      continuousPuzzleGenerator.getNew();
      continuousPuzzleGenerator.getNew();
      var puzzle = continuousPuzzleGenerator.getNew();
      expect(puzzle).toEqual({position: "p3"});
    });
  });
});
