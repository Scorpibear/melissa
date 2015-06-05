'use strict';

describe('TrainController', function () {
    var noMorePuzzles = "no more puzzles";
    var $controller;

    beforeEach(module('melissa.train'));

    beforeEach(module(function ($provide) {
        var messages = {
            noMorePuzzles: function () {
                return noMorePuzzles;
            }
        };
        var puzzleProvider = {
            getPuzzle: function () {
                return null;
            }
        };
        $provide.value("messages", messages);
        $provide.value("puzzleProvider", puzzleProvider);
    }));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe("showNextPuzzle", function () {
        it("update training status", function () {
            var $scope = {};
            $controller('TrainController', {$scope: $scope});
            $scope.showNextPuzzle();
            expect($scope.training.status).toEqual(noMorePuzzles);
        })

    });
});