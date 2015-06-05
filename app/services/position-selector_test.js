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
                m: "d4",
                n: 1,
                c: "w",
                t: "wb",
                s: [{m: "Nf6", n: 1, c: "b"}]
            });
            expect(result[0]).toEqual({m: "d4 Nf6", n: 1, c: "b", t: "wb"});
        });
        it("get only best", function () {
            var result = positionSelector.getBestSubPositions({
                m: "d4",
                n: 1,
                c: "w",
                t: "wb",
                s: [{m: "Nf6", n: 1, c: "b", s: []}, {m: "e6", n: 1, c: "b"}]
            });
            expect(result.length).toEqual(1);
        });
        it("get black for black position", function () {
            var result = positionSelector.getBestSubPositions({
                m: "e4",
                n: 1,
                c: "w",
                t: "b",
                s: [{m: "e6", n: 1, c: "b", s: [{m: "Nf3", n: 2, c: "w"}]}, {m: "c5", n: 1, c: "b"}]
            });
            expect(result[0]).toEqual({m: "1.e4 e6 2.Nf3", n: 2, c: "w", t: "b"});
        })
    })
});
