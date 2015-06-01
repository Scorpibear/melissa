'use strict';

angular.module('melissa.train', ['ngRoute', 'melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/train', {
            templateUrl: 'train/train.html'
        });
    }])
    .constant('chessGame', new Chess())
    .constant("TIMEOUT_BETWEEN_PUZZLES", 1000)
    .controller('TrainController', function ($scope, puzzleProvider, chessGame, TIMEOUT_BETWEEN_PUZZLES) {
        $scope.training = {};
        $scope.showNextPuzzle = function () {
            var puzzle = puzzleProvider.getPuzzle();
            if (puzzle != null) {
                $scope.training.puzzle = puzzle;
                var pgn = $scope.training.puzzle.position;
                chessGame.load_pgn(pgn);
                var fen = chessGame.fen();
                var orientation = (chessGame.turn() == chessGame.WHITE) ? 'white' : 'black';
                $scope.board.orientation(orientation);
                $scope.board.position(fen);
                $scope.training.status = "What is the best move?";
            } else {
                $scope.training.status = "Good job, no more puzzles, have a rest!";
            }
        };
        $scope.next = function () {
            setTimeout(function () {
                $scope.showNextPuzzle();
                $scope.$apply()
            }, TIMEOUT_BETWEEN_PUZZLES);
        }
    })
;