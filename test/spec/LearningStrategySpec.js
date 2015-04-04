describe("LearningStrategy", function() {
    var strategy;

    beforeEach(function() {
        strategy = new LearningStrategy([]);
    });

    it("refill add 1 new puzzle", function() {
        strategy.puzzleQueue = [];
        strategy.refillQueue();
        expect(strategy.puzzleQueue.length).toEqual(1);
    });

    it("add new", function() {
        strategy.puzzleQueue = [];
        strategy.addNew();
        expect(strategy.puzzleQueue.length).toEqual(1);
    });

    it("add oldest", function() {
        strategy.puzzleQueue = [new Puzzle('1.d4', 'Nf6')];
        strategy.addOldest();
        expect(strategy.puzzleQueue.length).toEqual(1);
    });

    it("add 10 new", function() {
        strategy.puzzleQueue = [];
        var iterations = 10;
        for(var i=0;i<iterations;i++) {
            strategy.addNew();
        }
        expect(strategy.puzzleQueue.length).toEqual(iterations);
    });

});
