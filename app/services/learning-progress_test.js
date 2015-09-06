describe("learningProgress", function() {
    var learningProgress;

    beforeEach(module("melissa.services"));
    beforeEach(inject(function (_learningProgress_) {
        learningProgress = _learningProgress_;
    }));

    describe("isLearnt", function() {
        it("remove puzzle with changed answer", function() {
            learningProgress.reset();
            learningProgress.markAsLearnt({position: "d4", answer: "e6"});
            expect(learningProgress.isLearnt({position: "d4", answer: "Nf6"})).toBeFalsy();
            expect(learningProgress.getPuzzlesLearnt()).toEqual(0)
        })
    });

    describe("reset", function() {
        it("empty learning puzzles", function() {
            learningProgress.markAsLearnt({position: "", answer: ""});
            learningProgress.reset();
            expect(learningProgress.getPuzzlesLearnt()).toEqual(0)
        })
    })
});
