'use strict';

angular.module('melissa.train', ['ngRoute', 'melissa.messages', 'melissa.services'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/js/train', {
            templateUrl: 'js/train/train.html'
        });
    }])
    .constant('chessGame', new Chess())
    .constant("TIMEOUT_BETWEEN_PUZZLES", 1000)
    .controller('TrainController', ['$scope', 'puzzleProvider', 'chessGame', 'messages', 'learningProgress',
            'TIMEOUT_BETWEEN_PUZZLES', function ($scope, puzzleProvider, chessGame, messages, learningProgress, TIMEOUT_BETWEEN_PUZZLES) {
        $scope.training = {solved: 0};
        $scope.showNextPuzzle = function () {
            var puzzle = puzzleProvider.getPuzzle();
            if (puzzle != null) {
                $scope.training.puzzle = puzzle;
                $scope.training.solvedFromFirstTry = true;
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
            if($scope.training.solvedFromFirstTry) {
                learningProgress.markAsLearnt($scope.training.puzzle)
            }
            $scope.$apply();
            setTimeout(function () {
                $scope.showNextPuzzle();
                $scope.$apply()
            }, TIMEOUT_BETWEEN_PUZZLES);
        }
    }])
