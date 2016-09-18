'use strict';

describe("positionSelector", function () {
    var positionSelector;
    beforeEach(module("melissa.services"));
    beforeEach(inject(function (_positionSelector_) {
        positionSelector = _positionSelector_;
    }));
    describe("getBestSubPositions", function () {
        it("extend positions", function () {
            var result = positionSelector.getBestSubPositions({
                pgn: "1.d4",
                m: "d4",
                n: 1,
                c: "w",
                t: "wb",
                s: [{m: "Nf6", n: 1, c: "b"}]
            });
            expect(result[0]).toEqual({pgn: "1.d4 Nf6", m: "Nf6", n: 1, c: "b", t: "wb"});
        });
        it("get for wb", function () {
            var result = positionSelector.getBestSubPositions({
                pgn: "1.d4 Nf6",
                m: "Nf6",
                n: 1,
                c: "b",
                t: "wb",
                s: [{m: "Nf3", n: 2, c: "w", s: []}, {m: "c4", n: 2, c: "w", s: [{m: "e6", n: 2, c: "b"}]}]
            });
            expect(result[0].pgn).toEqual("1.d4 Nf6 2.Nf3");
            expect(result[0].t).toEqual("wb");
            expect(result[1].pgn).toEqual("1.d4 Nf6 2.c4");
            expect(result[1].t).toEqual("b");
        });
        it("get black for black position", function () {
            var result = positionSelector.getBestSubPositions({
                pgn: "1.e4",
                m: "e4",
                n: 1,
                c: "w",
                t: "b",
                s: [{m: "e6", n: 1, c: "b", s: [{m: "Nf3", n: 2, c: "w"}]}, {m: "c5", n: 1, c: "b"}]
            });
            expect(result[0]).toEqual({pgn: "1.e4 e6 2.Nf3", m: "Nf3", n: 2, c: "w", t: "b"});
        });
        it("returns emply array if s is not specified", function () {
            var result = positionSelector.getBestSubPositions({pgn: ""});
            expect(result.length).toEqual(0);
        });
        it("skip if n is less than prev", function () {
            var result = positionSelector.getBestSubPositions({
                pgn: "1.d4 Nf6 2.c4",
                n: 2,
                c: "w",
                t: "b",
                s: [{m: "e6", n: 1}]
            });
            expect(result.length).toEqual(0);
        })
    });
    describe("getNextPositionOfTheColor", function() {
      var positionObject = {pgn: "", m: "", s: [
          {m: "e4", s: [
            {m: "e6", s: [
              {m: "d4"}
            ]}
          ]}
        ]};
      it("returns next position", function() {
        var result = positionSelector.getNextPositionOfTheColor(positionObject);
        expect(result).toBe(positionObject.s[0].s[0]);
      });
      it("fills pgn property", function() {
        var result = positionSelector.getNextPositionOfTheColor(positionObject);
        expect(result.pgn).toBe('e4 e6');
      })
      it("returns null if no next position", function() {
        var result = positionSelector.getNextPositionOfTheColor(positionObject);
        result = positionSelector.getNextPositionOfTheColor(result);
        expect(result).toEqual(null);
      })
    })
});
