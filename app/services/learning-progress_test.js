describe("learningProgress", function() {
    var learningProgress;

    beforeEach(module("melissa.services"));
    beforeEach(inject(function (_learningProgress_) {
        learningProgress = _learningProgress_;
    }));

    describe("getPuzzlesLearnt", function() {
        it("returns zero if there are no puzzles", function() {
            learningProgress.reset();
            expect(learningProgress.getPuzzlesLearnt()).toEqual(0);
        });
        it("increased when new puzzle learnt", function() {
            learningProgress.reset();
            learningProgress.markAsLearnt({position: "", answer: "d4"});
            expect(learningProgress.getPuzzlesLearnt()).toEqual(1);
        })
    });

    describe("markAsLearnt", function() {
        it("saves learnt puzzles", function() {
            learningProgress.reset();
            learningProgress.markAsLearnt({position: "", answer: "d4"});
            expect(learningProgress.isLearnt({position: "", answer: "d4"})).toBeTruthy();
        });
        it("mark only one puzzle once", function() {
            learningProgress.markAsLearnt({position: "", answer: "d4"});
            var initialCount = learningProgress.getPuzzlesLearnt();
            learningProgress.markAsLearnt({position: "", answer: "d4"});
            expect(learningProgress.getPuzzlesLearnt()).toEqual(initialCount);
        })
    });

    describe("isLearnt", function() {
        it("returns false for unknown puzzles", function() {
            learningProgress.reset();
            expect(learningProgress.isLearnt({position: "1.d4 Nf6", answer: "Nf3"})).toBeFalsy();
        });
        it("remove puzzle with changed answer", function() {
            learningProgress.reset();
            learningProgress.markAsLearnt({position: "d4", answer: "e6"});
            expect(learningProgress.isLearnt({position: "d4", answer: "Nf6"})).toBeFalsy();
            expect(learningProgress.getPuzzlesLearnt()).toEqual(0)
        });
        it("returns true if is learnt", function() {
            learningProgress.markAsLearnt({position: "1.d4", answer: "Nf6"});
            expect({position: "1.d4", answer: "Nf6"}).toBeTruthy()
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
