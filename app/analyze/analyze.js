'use strict';

angular.module('melissa.analyze', ['ngRoute', 'melissa.messages', 'melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/analyze', {
            templateUrl: 'analyze/analyze.html'
        });
    }])
    .constant('analyzeChessGame', new Chess())
    .controller('AnalyzeController', ['$scope', 'analyzeChessGame', 'baseProvider', 'trainMode', function ($scope, analyzeChessGame, baseProvider, trainMode) {
        $('#analyzed-pgn').html("");
        $scope.moveNumber = 0;
        $scope.pgnElements = [];

        $scope.registerPositionChange = function (move) {
            var numStr = (move.color == "w") ? "" + (++$scope.moveNumber) + ". " : "";
            $scope.$apply();
            var moves = analyzeChessGame.history()
            var bestMoveSan = baseProvider.getBestMove(moves.slice(0, -1))
            var lastMoveSan = moves[moves.length-1]
            var betterMoveStr = $scope.getBetterMoveStr(bestMoveSan, lastMoveSan);
            var typeStr = $scope.getType(moves);
            var className = typeStr + "-move";
            var moveEl = $(document.createElement('span')).addClass(className).html(numStr + move.san + betterMoveStr +' ');
            $scope.pgnElements.push(moveEl);
            $('#analyzed-pgn').append(moveEl);
        };

        /* returns "unknown"/"best"/"wrong"*/
        $scope.getType = function (moves) {
            return baseProvider.validateMoves(moves);
        }

        $scope.back = function() {
            if($scope.moveNumber == 0) return;
            var move = analyzeChessGame.undo();
            if(move.color == 'w') $scope.moveNumber--;
            $scope.board.position(analyzeChessGame.fen());
            $($scope.pgnElements.pop()).remove()
        }

        $scope.switchOrientation = function() {
            $scope.board.orientation(($scope.board.orientation() == 'white') ? 'black' : 'white');
        }

        $scope.getBetterMoveStr = function(bestMoveSan, lastMoveSan) {
            return (bestMoveSan && bestMoveSan!=lastMoveSan) ? "("+bestMoveSan+"!)" : "";
        }

        $scope.trainBranch = function() {
            var position = analyzeChessGame.history()
            console.log(position)
            trainMode.branch(position)
        }
    }]);
