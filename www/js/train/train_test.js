'use strict';

describe('TrainController', function () {
    var $controller;

    beforeEach(module('melissa.train'));

    beforeEach(module(function ($provide) {
        var puzzleProvider = {
            getPuzzle: function () {
                return null;
            }
        };
        $provide.value("puzzleProvider", puzzleProvider);
    }));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe("showNextPuzzle", function() {
        it("update training status", function() {
            var $scope = {};
            var messages = {get: () => {}};
            spyOn(messages, 'get').and.returnValue('no more');
            $controller('TrainController', {$scope: $scope, messages: messages});
            $scope.showNextPuzzle();
            expect($scope.training.status).toEqual('no more');
        });
        it("stops when session limit is reached", function() {
            var $scope = {};
            var puzzleProvider = {getPuzzle: () => ({position: ''})};
            $controller('TrainController', {$scope: $scope, puzzleProvider: puzzleProvider});
            expect($scope.showNextPuzzle()).toBeFalsy();
        });
    });
    describe("registerCorrectAnswer", function() {
        it("register result in trainingSession", function() {
            var $scope = {$apply: () => {}};
            var trainingSession = {register: () => {}};
            spyOn(trainingSession, 'register');
            $controller('TrainController', {$scope: $scope, trainingSession: trainingSession})
            $scope.training.solvedFromFirstTry = true;
            $scope.registerCorrectAnswer();
            expect(trainingSession.register).toHaveBeenCalledWith({correct: true});
        });
    });
});
