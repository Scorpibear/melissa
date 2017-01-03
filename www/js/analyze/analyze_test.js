'use strict';

describe('melissa.analyze module', function () {

    beforeEach(module('melissa.analyze'));

    describe('analyze controller', function () {
        var baseProvider = { 
        	validateMoves: function() {},
        	getEvaluation: function() {
        		return {v: 0.06, d: 32};
        	}
        	};
        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));
        describe('constructor', function() {
            it('resets chessGame', function() {
                var analyzeChessGame = {reset: function() {}};
                spyOn(analyzeChessGame, 'reset');
                var analyzeCtrl = $controller('AnalyzeController', {$scope: {}, analyzeChessGame: analyzeChessGame});
                expect(analyzeChessGame.reset).toHaveBeenCalled();
            });
        });
        describe('getType', function() {
            beforeEach(function () {
                spyOn(baseProvider, 'validateMoves');
            });
            it("uses baseProvider.validateMoves", function() {
                var $scope = {};
                var analyzeCtrl = $controller('AnalyzeController', {$scope: $scope, baseProvider: baseProvider});
                $scope.getType([]);
                expect(baseProvider.validateMoves).toHaveBeenCalled();
            });
        });
        describe('getEvaluationAndDepthStr', function() {
        	it("get evaluation by move", function() {
        		var $scope = {};
                var analyzeCtrl = $controller('AnalyzeController', {$scope: $scope, baseProvider: baseProvider});
        		expect($scope.getEvaluationAndDepthStr()).toEqual("0.06 32");
        	});
            it("get empty string if evaluation is undefined", function() {
                var $scope = {};
                var analyzeCtrl = $controller('AnalyzeController', {$scope: $scope, baseProvider: baseProvider});
                spyOn(baseProvider, 'getEvaluation').and.returnValue(undefined);
                expect($scope.getEvaluationAndDepthStr()).toEqual("");
            });
            it("provide only existing value if only it is known", function() {
                var $scope = {};
                var analyzeCtrl = $controller('AnalyzeController', {$scope: $scope, baseProvider: baseProvider});
                spyOn(baseProvider, 'getEvaluation').and.returnValue({v: 0.23});
                expect($scope.getEvaluationAndDepthStr()).toEqual("0.23");
            });
            it("if evaluation is unknown, depth is useless so provide empty string", function() {
                var $scope = {};
                var analyzeCtrl = $controller('AnalyzeController', {$scope: $scope, baseProvider: baseProvider});
                spyOn(baseProvider, 'getEvaluation').and.returnValue({d: 30});
                expect($scope.getEvaluationAndDepthStr()).toEqual("");
            });
        });
    });
});