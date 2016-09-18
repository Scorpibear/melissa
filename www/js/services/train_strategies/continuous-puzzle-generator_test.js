'use strict';

describe('continuousPuzzleGenerator service', function () {
  var continuousPuzzleGenerator;

  beforeEach(module('melissa.services'));

  beforeEach(module(function ($provide) {
    var baseProvider = {
      getStart: function () {
        return {m: '', s: [
          {m: "p1", s: [
            { m: "p2", s: []}
          ]}
        ]};
      },
      getBestSubPositions: function () {
        return [{m: "p1"}];
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
    })
  });
});
