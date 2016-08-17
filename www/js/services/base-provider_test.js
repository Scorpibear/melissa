'use strict';

describe("baseProvider", function () {
    var baseProvider;
    var myBase = {};
    var moveValidator = {
        called: false,
        validateParams: null,
        validateResult: "unknown",
        validate: function(moves, base) {
            this.called = true;
            this.validateParams = [moves, base];
            return this.validateResult;
        }};
    var queueToAnalyze = [];

    beforeEach(module("melissa.services"));
    beforeEach(module(function ($provide) {
        $provide.value("base", myBase);
        $provide.value("moveValidator", moveValidator);
        $provide.value("queueToAnalyze", queueToAnalyze);
    }));
    beforeEach(inject(function (_baseProvider_) {
        baseProvider = _baseProvider_;
    }));

    describe("getStart", function () {
        beforeEach(function () {
            myBase.s = [];
        });
        it("returns base with subnodes", function () {
            myBase.s.push({m: "d4", n: 1});
            var returnedBase = baseProvider.getStart();
            expect(returnedBase).toEqual({pgn : '', s : [ { m : 'd4', n : 1 } ]});
        });
    });
    describe("validateMoves", function() {
        it("uses move validator", function() {
            moveValidator.called = false;
            baseProvider.validateMoves(["d4", "Nf6"]);
            expect(moveValidator.called).toBeTruthy();
        });
        it("pass correct parameters", function() {
            moveValidator.validateParams = null;
            baseProvider.validateMoves(["d4", "Nf6"]);
            expect(moveValidator.validateParams).toEqual([["d4", "Nf6"],myBase]);
        });
        it("unanalyzed moves added to queue without last", function() {
            queueToAnalyze.length = 0;
            baseProvider.validateMoves(["Nf6", "h4"]);
            expect(queueToAnalyze).toEqual([["Nf6"]]);
        });
        it("returns result", function() {
            moveValidator.validateResult = "returns result as is";
            var result = baseProvider.validateMoves([]);
            expect(result).toEqual("returns result as is");
        })
    });
    describe("getBestMove", function() {
        it("does not send for analysis", function() {
            spyOn(queueToAnalyze, 'push')
            baseProvider.getBestMove(["d4", "a5", "c4"])
            expect(queueToAnalyze.push).not.toHaveBeenCalled()
        })
    });
    describe("getEvaluation", function() {
    	it("returns evaluation", function() {
    		var evaluation = {v: 0.3, d: 31};
            myBase.e = evaluation;
            var moves = [];
            var outputEvaluation = baseProvider.getEvaluation(moves);
    		expect(outputEvaluation.v).toEqual(0.3);
    		expect(outputEvaluation.d).toEqual(31);
    	});
        it("returns null if position is null", function() {
            expect(baseProvider.getEvaluation(["h4", "h5", "a4"])).toEqual(null);
        })
    });

});
