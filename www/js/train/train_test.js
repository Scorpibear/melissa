'use strict';

describe('TrainController', function () {
    var $controller;
    const trainingSession = {register: function(){}, isInProgress: () => true, start: () => {},
        getNumberOfCorrectAnswers: function(){}, getNumberOfAnswers: function(){}
    };
    const $scope = {board: {orientation: function(){}, position: function(){}}, $apply: () => {}};
    const chessGame = {load_pgn: function() {}, turn: function(){}, fen: function(){}};

    beforeEach(module('melissa.train'));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe("showNextPuzzle", function() {
        it("update training status", function() {
            var messages = {get: function() {}};
            spyOn(messages, 'get').and.returnValue('no more');
            $controller('TrainController', {$scope, messages});
            $scope.showNextPuzzle();
            expect($scope.training.status).toEqual('no more');
        });
        it("stops when session limit is reached", function() {
            var puzzleProvider = {getPuzzle: function() {return {position: ''}}};
            spyOn(trainingSession, 'isInProgress').and.returnValue(false);
            $controller('TrainController', {$scope, puzzleProvider, trainingSession});
            expect($scope.showNextPuzzle()).toBeFalsy();
        });
        it("set solvedFromFirstTry to true", function() {
            $controller('TrainController', {$scope, trainingSession});

            $scope.showNextPuzzle();

            expect($scope.training.solvedFromFirstTry).toBeTruthy();
        });
        it('chessGame loads pgn from puzzle position', function() {
            var position = '1.d4'
            var puzzleProvider = {getPuzzle: function(){return {position: position}}};
            spyOn(chessGame, 'load_pgn');
            $controller('TrainController', {$scope, trainingSession, chessGame, puzzleProvider});

            $scope.showNextPuzzle();

            expect(chessGame.load_pgn).toHaveBeenCalledWith(position);
        });
        it('sets orientation based on turn from chessGame', function() {
            var position = '1.d4'
            var puzzleProvider = {getPuzzle: function(){return {position}}};
            spyOn(chessGame, 'turn').and.returnValue('black');
            spyOn($scope.board, 'orientation');
            $controller('TrainController', {$scope, trainingSession, chessGame, puzzleProvider});

            $scope.showNextPuzzle();

            expect($scope.board.orientation).toHaveBeenCalledWith('black');
        });
        it('registers puzzle', function() {
            var puzzle = {position: 'a', answer: 'b'};
            var puzzleProvider = {getPuzzle: function(){return puzzle;}};
            spyOn(trainingSession, 'isInProgress').and.returnValue(true);
            $controller('TrainController', {$scope, trainingSession, chessGame, puzzleProvider});
            spyOn($scope, 'registerPuzzle').and.callThrough();

            $scope.showNextPuzzle();

            expect($scope.registerPuzzle).toHaveBeenCalledWith(puzzle);
        });
    });
    describe("registerCorrectAnswer", function() {
        it("register result in trainingSession", function() {
            spyOn(trainingSession, 'register');
            $controller('TrainController', {$scope, trainingSession})
            $scope.training.solvedFromFirstTry = true;
            $scope.registerCorrectAnswer();
            expect(trainingSession.register).toHaveBeenCalledWith({correct: true});
        });
        it('register negative result if solves from second attempt', function() {
            var $scope = {$apply: function(){}};
            var learningProgress = {};
            $controller('TrainController', {$scope: $scope, learningProgress, trainingSession})
            spyOn(trainingSession, 'register');

            $scope.registerCorrectAnswer();

            expect(trainingSession.register).toHaveBeenCalledWith({correct: false});
        });
        it('schedule the next puzzle to show', function() {
            var $scope = {$apply: function(){}, showNextPuzzle: function(){}};
            var learningProgress = {};
            var timeoutFn;
            var ng = {$timeout: function(fn){timeoutFn = fn}};
            $controller('TrainController', {$scope, learningProgress, trainingSession, $timeout: ng.$timeout})
            $scope.registerCorrectAnswer();
            spyOn($scope, 'showNextPuzzle');

            timeoutFn();

            expect($scope.showNextPuzzle).toHaveBeenCalled();
        })
    });
});
