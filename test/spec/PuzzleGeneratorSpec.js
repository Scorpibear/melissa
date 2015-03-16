describe("PuzzleGenerator", function () {
    'use strict';

    it("generates 1 puzzle", function () {
        var puzzles = [],
            baseObject = {},
            generator = null,
            newPuzzle = null;
        jQuery.extend(baseObject, base);
        generator = new PuzzleGenerator(baseObject, puzzles);
        newPuzzle = generator.generate();
        expect(newPuzzle).not.toBeNull();
    });

    it("generates 9 puzzles", function () {
        var puzzles = [],
            baseObject = {},
            generator = null,
            newPuzzle = null,
            iterations = 9,
            i;
        jQuery.extend(baseObject, base);
        generator = new PuzzleGenerator(baseObject, puzzles);
        for (i = 0; i < iterations; i += 1) {
            newPuzzle = generator.generate();
            puzzles.push(newPuzzle);
        }
        expect(newPuzzle).not.toBeNull();
    });

});