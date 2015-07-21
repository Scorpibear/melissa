'use strict';

describe('melissa.analyze module', function () {

    beforeEach(module('melissa.analyze'));

    describe('analyze controller', function () {
        var baseProvider = {validateMoves: function() {}};
        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));
        describe('getType', function() {
            beforeEach(function () {
                spyOn(baseProvider, 'validateMoves');
            });
            it("uses baseProvider.validateMoves", function() {
                var $scope = {};
                var analyzeCtrl = $controller('AnalyzeController', {$scope: $scope, baseProvider: baseProvider});
                $scope.getType([]);
                expect(baseProvider.validateMoves).toHaveBeenCalled();
            })
        })
    });
});