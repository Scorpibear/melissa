'use strict';

describe('TrainController', function () {
    var $controller;

    beforeEach(module('melissa.train'));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe("showNextPuzzle", function() {
        var chessGame = null;
        beforeEach(function(){
            chessGame = {load_pgn: function() {}, turn: function(){}, fen: function(){}};
        })
        it("update training status", function() {
            var $scope = {};
            var messages = {get: function() {}};
            spyOn(messages, 'get').and.returnValue('no more');
            $controller('TrainController', {$scope: $scope, messages: messages});
            $scope.showNextPuzzle();
            expect($scope.training.status).toEqual('no more');
        });
        it("stops when session limit is reached", function() {
            var $scope = {};
            var puzzleProvider = {getPuzzle: function() {return {position: ''}}};
            $controller('TrainController', {$scope: $scope, puzzleProvider: puzzleProvider});
            expect($scope.showNextPuzzle()).toBeFalsy();
        });
        it("set solvedFromFirstTry to true", function() {
            var $scope = {};
            var trainingSession = {isInProgress: function(){return true}};
            $controller('TrainController', {$scope: $scope, trainingSession: trainingSession});

            $scope.showNextPuzzle();

            expect($scope.training.solvedFromFirstTry).toBeTruthy();
        });
        it('chessGame loads pgn from puzzle position', function() {
            var $scope = {board: {orientation: function(){}, position: function(){}}};
            var trainingSession = {isInProgress: function(){return true}};
            var position = '1.d4'
            var puzzleProvider = {getPuzzle: function(){return {position: position}}};
            spyOn(chessGame, 'load_pgn');
            $controller('TrainController', {$scope: $scope, trainingSession: trainingSession, chessGame: chessGame, puzzleProvider: puzzleProvider});

            $scope.showNextPuzzle();

            expect(chessGame.load_pgn).toHaveBeenCalledWith(position);
        });
        it('sets orientation based on turn from chessGame', function() {
            var $scope = {board: {orientation: function(){}, position: function(){}}};
            var trainingSession = {isInProgress: function(){return true}};
            var position = '1.d4'
            var puzzleProvider = {getPuzzle: function(){return {position: position}}};
            spyOn(chessGame, 'turn').and.returnValue('black');
            spyOn($scope.board, 'orientation');
            $controller('TrainController', {$scope: $scope, trainingSession: trainingSession, chessGame: chessGame, puzzleProvider: puzzleProvider});

            $scope.showNextPuzzle();

            expect($scope.board.orientation).toHaveBeenCalledWith('black');
        });
        it('registers puzzle', function() {
            var puzzle = {position: 'a', answer: 'b'};
            var $scope = {board: {orientation: function(){}, position: function(){}}};
            var puzzleProvider = {getPuzzle: function(){return puzzle;}};
            $controller('TrainController', {$scope: $scope, trainingSession: {isInProgress: function(){return true;}}, chessGame: chessGame, puzzleProvider: puzzleProvider});
            spyOn($scope, 'registerPuzzle').and.callThrough();

            $scope.showNextPuzzle();

            expect($scope.registerPuzzle).toHaveBeenCalledWith(puzzle);
        });
    });
    describe("registerCorrectAnswer", function() {
        var trainingSession = null;
        beforeEach(function() {
            trainingSession = {register: function(){}, isInProgress: function(){}, getNumberOfCorrectAnswers: function(){}, getNumberOfAnswers: function(){}};
        })
        it("register result in trainingSession", function() {
            var $scope = {$apply: function() {}};
            spyOn(trainingSession, 'register');
            $controller('TrainController', {$scope: $scope, trainingSession: trainingSession})
            $scope.training.solvedFromFirstTry = true;
            $scope.registerCorrectAnswer();
            expect(trainingSession.register).toHaveBeenCalledWith({correct: true});
        });
        it('register negative result if solves from second attempt', function() {
            var $scope = {$apply: function(){}};
            var learningProgress = {};
            $controller('TrainController', {$scope: $scope, learningProgress: learningProgress, trainingSession: trainingSession})
            spyOn(trainingSession, 'register');

            $scope.registerCorrectAnswer();

            expect(trainingSession.register).toHaveBeenCalledWith({correct: false});
        });
        it('schedule the next puzzle to show', function() {
            var $scope = {$apply: function(){}, showNextPuzzle: function(){}};
            var learningProgress = {};
            var timeoutFn;
            var ng = {$timeout: function(fn){timeoutFn = fn}};
            $controller('TrainController', {$scope: $scope, learningProgress: learningProgress, trainingSession: trainingSession, $timeout: ng.$timeout})
            $scope.registerCorrectAnswer();
            spyOn($scope, 'showNextPuzzle');

            timeoutFn();

            expect($scope.showNextPuzzle).toHaveBeenCalled();
        })
    });
});
