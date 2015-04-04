describe("PuzzleGenerator", function () {
    'use strict';

    it("generates 1 puzzle", function () {
        var puzzles = [],
            baseArray = [],
            generator,
            newPuzzle,
            i;
        for (i = 0; i < base.length; i++) {
            baseArray.push(base[i]);
        }
        generator = new PuzzleGenerator(baseArray, puzzles);
        newPuzzle = generator.generate();
        expect(newPuzzle).not.toBeNull();
    });

    it("generates 9 puzzles", function () {
        var puzzles = [],
            baseArray = [],
            generator,
            newPuzzle = null,
            iterations = 9,
            i;
        console.log('iterations: ' + iterations);
        console.log('base length: ' + base.length);
        for (i = 0; i < base.length; i++) {
            baseArray.push(base[i]);
        }
        generator = new PuzzleGenerator(baseArray, puzzles);
        for (i = 0; i < iterations; i += 1) {
            newPuzzle = generator.generate();
            puzzles.push(newPuzzle);
        }
        expect(newPuzzle).not.toBeNull();
    });

});