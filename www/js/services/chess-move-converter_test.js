'use strict';

describe("chessMoveConverter", function () {
    var converter;

    beforeEach(module("melissa.services"));
    beforeEach(inject(function (_chessMoveConverter_) {
        converter = _chessMoveConverter_;
    }));

    describe("sanToSquare", function() {
        it("pawn", function() {
            expect(converter.sanToSquare("a6")).toEqual("a6");
        });
        it("pawn capture", function() {
            expect(converter.sanToSquare("exd5")).toEqual("d5");
        });
        it("check", function() {
            expect(converter.sanToSquare("Qe7+")).toEqual("e7");
        })
    })
});
