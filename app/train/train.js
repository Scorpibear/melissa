'use strict';

angular.module('melissa.train', ['ngRoute', 'melissa.messages', 'melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/train', {
            templateUrl: 'train/train.html'
        });
    }])
    .constant('chessGame', new Chess())
    .constant("TIMEOUT_BETWEEN_PUZZLES", 1000)
    .controller('TrainController', function ($scope, puzzleProvider, chessGame, messages, TIMEOUT_BETWEEN_PUZZLES) {
        $scope.training = {solved: 0, tried: 0};
        $scope.showNextPuzzle = function () {
            var puzzle = puzzleProvider.getPuzzle();
            if (puzzle != null) {
                $scope.training.puzzle = puzzle;
                var pgn = $scope.training.puzzle.position;
                chessGame.load_pgn(pgn);
                var orientation = (chessGame.turn() == chessGame.WHITE) ? 'white' : 'black';
                $scope.board.orientation(orientation);
                $scope.board.position(chessGame.fen());
                $scope.training.status = messages.get("What is the best move?");
            } else {
                $scope.training.status = messages.get("Good job, no more puzzles, have a rest!");
            }

        };
        $scope.registerCorrectAnswer = function () {
            $scope.training.status = messages.correctAnswer();
            $scope.training.solved++;
            $scope.$apply();
            setTimeout(function () {
                $scope.showNextPuzzle();
                $scope.$apply()
            }, TIMEOUT_BETWEEN_PUZZLES);
        }
    })
;