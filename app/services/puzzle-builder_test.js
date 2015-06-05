'use strict';

describe("puzzleBuilder", function () {
    var puzzleBuilder;

    beforeEach(module("melissa.services"));
    beforeEach(inject(function (_puzzleBuilder_) {
        puzzleBuilder = _puzzleBuilder_;
    }));

    describe("buildFromPositionObject", function () {
        it("uses move with number", function () {
            var positionObject = {m: 'd4', n: 1, c: 'w', s: [{m: 'Nf6', n: 1, c: 'b'}]};
            var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
            expect(puzzle).toEqual({position: "1.d4", answer: "Nf6"});
        });
        it("return null if no subnodes", function () {
            var puzzle = puzzleBuilder.buildFromPositionObject({m: 'd4', n: 1, c: 'w', s: []});
            expect(puzzle).toBeNull();
        });
    })
});