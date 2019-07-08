'use strict';

describe("baseUpdater", function () {
    var baseUpdater;
    var myBase = {pgn: ''};
    const moveValidatorDefaults = {
        called: false,
        validateParams: null,
        validateResult: "unknown",
        validate: function(moves, base) {
            this.called = true;
            this.validateParams = [moves, base];
            return this.validateResult;
        }};
    let moveValidator = new Object(moveValidatorDefaults);
    const queueToAnalyze = [];
    var positionSelector = {
        getBestSubPositions: function() {},
        getPositionByMoves: function() {}
    };

    beforeEach(module("melissa.services"));
    beforeEach(module(function ($provide) {
        $provide.value("baseManager", {restoreBase: function(){return myBase}});
        $provide.value("moveValidator", moveValidator);
        $provide.value("queueToAnalyze", queueToAnalyze);
        $provide.value("positionSelector", positionSelector);
    }));
    beforeEach(inject(function (_baseUpdater_) {
        baseUpdater = _baseUpdater_;
    }));

    describe("getStart", function () {
        beforeEach(function () {
            myBase.s = [];
        });
        it("returns base with subnodes", function () {
            myBase.s.push({m: "d4", n: 1});
            var returnedBase = baseUpdater.getStart();
            expect(returnedBase).toEqual({pgn : '', s : [ { m : 'd4', n : 1 } ]});
        });
    });
    describe("validateMoves", function() {
        beforeEach(() => {
            moveValidator = new Object(moveValidatorDefaults);
        })
        it("uses move validator", function() {
            moveValidator.called = false;
            baseUpdater.validateMoves(["d4", "Nf6"]);
            expect(moveValidator.called).toBeTruthy();
        });
        it("pass correct parameters", function() {
            moveValidator.validateParams = null;
            baseUpdater.validateMoves(["d4", "Nf6"]);
            expect(moveValidator.validateParams).toEqual([["d4", "Nf6"],myBase]);
        });
        it("unanalyzed moves added to queue without last", function() {
            queueToAnalyze.length = 0;
            spyOn(moveValidator, 'validate').and.returnValue('unknown');
            baseUpdater.validateMoves(["Nf6", "h4"]);
            expect(queueToAnalyze).toEqual([["Nf6"]]);
        });
        it("returns result", function() {
            moveValidator.validateResult = "returns result as is";
            var result = baseUpdater.validateMoves([]);
            expect(result).toEqual("returns result as is");
        })
    });
    describe("getBestMove", function() {
        it("does not send for analysis", function() {
            spyOn(queueToAnalyze, 'push')
            baseUpdater.getBestMove(["d4", "a5", "c4"])
            expect(queueToAnalyze.push).not.toHaveBeenCalled()
        });
        it("returns first move from submoves", function() {
            spyOn(positionSelector, 'getPositionByMoves').and.returnValue({s: [{m: 'Nf6'}, {m: 'something else'}]});
            expect(baseUpdater.getBestMove(['d4'])).toEqual("Nf6");
        })
    });
    describe("getEvaluation", function() {
    	it("returns evaluation", function() {
            spyOn(positionSelector, 'getPositionByMoves').and.returnValue({e: {v: 0.3, d: 31}})
    		
            var outputEvaluation = baseUpdater.getEvaluation([]);
    		
            expect(outputEvaluation.v).toEqual(0.3);
    		expect(outputEvaluation.d).toEqual(31);
    	});
        it("returns null if position is null", function() {
            expect(baseUpdater.getEvaluation(["h4", "h5", "a4"])).toEqual(null);
        });
    });
    describe("getBestSubPositions", function() {
        it("returns positionSelector.getBestSubPositions", function() {
            spyOn(positionSelector, 'getBestSubPositions');

            baseUpdater.getBestSubPositions({m: 'd4'});

            expect(positionSelector.getBestSubPositions).toHaveBeenCalledWith({m: 'd4'});
        });
    });
});
