'use strict';

describe('puzzleGenerator service', function () {
    var puzzleGenerator;

    beforeEach(module('melissa.services'));

    beforeEach(module(function ($provide) {
        var baseProvider = {
            getAll: function () {
                return [
                    {
                        m: "p1",
                        s: [
                            {
                                m: "p2",
                                s: [
                                    {s: [{}]}
                                ]
                            }
                        ]
                    }
                ];
            }
        };
        var puzzleBuilder = {
            buildFromPositionObject: function (positionObject) {
                return {position: positionObject.m}
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
            expect(puzzle).toEqual({position: "p1"});
        });

        it('should go next level', function () {
            puzzleGenerator.getNew();
            var puzzle = puzzleGenerator.getNew();
            expect(puzzle).toEqual({position: "p2"});
        })
    });
});
