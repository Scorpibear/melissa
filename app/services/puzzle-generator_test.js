'use strict';

describe('puzzleGenerator service', function () {
    var puzzleGenerator;
    var lastPositionObject;
    var originalPuzzle = {position: "p1", answer: "a1"};
    var secondPuzzle = {position: "p2", answer: "a2"};

    beforeEach(module('melissa.services'));

    beforeEach(module(function ($provide) {
        var baseProvider = {
            getAll: function () {
                return [
                    {
                        s: [
                            {
                                s: [
                                    {s: []}
                                ]
                            }
                        ]
                    }
                ];
            }
        };
        var puzzleBuilder = {
            buildFromPositionObject: function (positionObject) {
                lastPositionObject = positionObject;
                return originalPuzzle;
            }
        };
        $provide.value("baseProvider", baseProvider);
        $provide.value("puzzleBuilder", puzzleBuilder);
    }));

    beforeEach(inject(function (_puzzleGenerator_) {

        puzzleGenerator = _puzzleGenerator_;
    }));

    describe('getNew', function () {

        it('should get puzzle by positionObject', function () {
            var puzzle = puzzleGenerator.getNew();
            expect(puzzle).toEqual(originalPuzzle);
        });

        it('should go next level', function () {
            puzzleGenerator.getNew();
            var puzzle = puzzleGenerator.getNew();
            expect(puzzle).toEqual(secondPuzzle);
        })
    });
});
