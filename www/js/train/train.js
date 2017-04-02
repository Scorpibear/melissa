'use strict';

angular.module('melissa.train', ['ngRoute', 'melissa.messages', 'melissa.services'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/js/train', {
            templateUrl: 'js/train/train.html'
        });
    }])
    .constant('chessGame', new Chess())
    .constant("TIMEOUT_BETWEEN_PUZZLES", 1000)
    .controller('TrainController', ['$scope', '$timeout', 'puzzleProvider', 'chessGame', 'messages', 'learningProgress', 'trainingSession',
            'TIMEOUT_BETWEEN_PUZZLES',
            function ($scope, $timeout, puzzleProvider, chessGame, messages, learningProgress, trainingSession, TIMEOUT_BETWEEN_PUZZLES) {
        $scope.training = {compactPgn: "", numberOfCorrectAnswers: 0, numberOfAnswers: 0};
        $scope.showNextPuzzle = function () {
            var puzzle = puzzleProvider.getPuzzle();
            if (puzzle != null && trainingSession.isInProgress()) {
                $scope.registerPuzzle(puzzle);
                // maybe that should be in trainBoard service, not there
                if($scope.board) {
                    var pgn = $scope.training.puzzle.position;
                    chessGame.load_pgn(pgn);
                    var orientation = (chessGame.turn() == chessGame.WHITE) ? 'white' : 'black';
                    $scope.board.orientation(orientation);
                    $scope.board.position(chessGame.fen());
                }
                $scope.training.status = messages.get("What is the best move?");
                return true;
            } else {
                $scope.training.status = messages.get("Good job, no more puzzles, have a rest!");
                return false;
            }

        };
        $scope.registerPuzzle = function(puzzle) {
            $scope.training.puzzle = puzzle;
            $scope.training.solvedFromFirstTry = true;
            $scope.training.compactPgn = shortenPgn($scope.training.puzzle.position);
        }
        // TODO:
        function shortenPgn(position) {
            var shortenedPgn;
            return shortenedPgn;
        };
        $scope.registerCorrectAnswer = function () {
            $scope.training.status = messages.correctAnswer();
            if($scope.training.solvedFromFirstTry) {
                learningProgress.markAsLearnt($scope.training.puzzle);
                trainingSession.register({correct: true});
            } else {
                trainingSession.register({correct: false});
            }
            $scope.training.numberOfCorrectAnswers = trainingSession.getNumberOfCorrectAnswers();
            $scope.training.numberOfAnswers = trainingSession.getNumberOfAnswers();
            $scope.$apply();
            $timeout(function () {
                $scope.showNextPuzzle();
                $scope.$apply()
            }, TIMEOUT_BETWEEN_PUZZLES);
        }
    }])
