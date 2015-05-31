'use strict';

angular.module('melissa.train', ['ngRoute', 'melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/train', {
            templateUrl: 'train/train.html'
        });
    }])
    .controller('TrainController', function ($scope, puzzleProvider) {
        $scope.chessGame = new Chess();
        $scope.training = {};
        $scope.showNextPuzzle = function () {
            var puzzle = puzzleProvider.getPuzzle();
            if (puzzle != null) {
                $scope.training.puzzle = puzzle;
                var pgn = $scope.training.puzzle.position;
                $scope.chessGame.load_pgn(pgn);
                var fen = $scope.chessGame.fen();
                var orientation = ($scope.chessGame.turn() == $scope.chessGame.WHITE) ? 'white' : 'black';
                $scope.board.orientation(orientation);
                $scope.board.position(fen);
                $scope.training.status = "What is the best move?";
            } else {
                $scope.training.status = "Good job, no more puzzles, have a rest!";
            }
        };
        $scope.TIMEOUT_BETWEEN_PUZZLES = 1000;
        $scope.next = function () {
            setTimeout(function () {
                $scope.showNextPuzzle();
                $scope.$apply()
            }, $scope.TIMEOUT_BETWEEN_PUZZLES);
        }
    })
;