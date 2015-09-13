describe('puzzleProvider', function() {
    var puzzleProvider;

    beforeEach(module('melissa.services'));

    beforeEach(inject(function (_puzzleProvider_) {
        puzzleProvider = _puzzleProvider_;
    }));
    describe('getPuzzle', function() {
        it('returns puzzle', function() {
            var puzzle = puzzleProvider.getPuzzle();
            expect(puzzle).not.toBeNull();
        })
        it("1000 puzzles per second", function() {
            var start = new Date();
            var puzzle;
            var count = 500;
            for(var i=0; i<count; i++) {
                puzzle = puzzleProvider.getPuzzle();
            }
            var end = new Date();
            var duration = new Date() - start;
            expect(duration).toBeLessThan(count);
        })
    })
})