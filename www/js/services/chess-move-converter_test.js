'use strict';

describe("chessMoveConverter", function () {
    var converter;

    beforeEach(module("melissa.services"));
    beforeEach(inject(function (_chessMoveConverter_) {
        converter = _chessMoveConverter_;
    }));

    describe("sanToSquares", function() {
        it("pawn", function() {
            expect(converter.sanToSquares("a6")).toEqual(["a6"]);
        });
        it("pawn capture", function() {
            expect(converter.sanToSquares("exd5")).toEqual(["d5"]);
        });
        it("check", function() {
            expect(converter.sanToSquares("Qe7+")).toEqual(["e7"]);
        });
        it("kingside castle", function() {
            expect(converter.sanToSquares("O-O","w")).toEqual(["g1","f1"]);
        });
        it("queenside castle", function() {
            expect(converter.sanToSquares("O-O-O","w")).toEqual(["c1","d1"]);
        });
        it("kingside castle of black", function() {
            expect(converter.sanToSquares("O-O", "b")).toEqual(["g8", "f8"]);
        });
        it("promotion", function() {
            expect(converter.sanToSquares("e8=Q")).toEqual(["e8"]);
        })
    })
});
