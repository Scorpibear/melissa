'use strict';

angular.module('melissa.analyze', ['ngRoute', 'melissa.messages', 'melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/js/analyze', {
            templateUrl: 'js/analyze/analyze.html'
        });
    }])
    .constant('analyzeChessGame', new Chess())
    .controller('AnalyzeController', ['$scope', 'analyzeChessGame', 'baseUpdater', 'trainMode', function ($scope, analyzeChessGame, baseUpdater, trainMode) {
        $('#analyzed-pgn').html("");
        $scope.moveNumber = 0;
        $scope.pgnElements = [];
        analyzeChessGame.reset();

        $scope.registerPositionChange = function(move) {
            if(move.color == "w") {
                $scope.moveNumber++;
                $scope.$apply();
            }
            var moves = analyzeChessGame.history();
            var bestMoveSan = baseUpdater.getBestMove(moves.slice(0, -1));
            var lastMoveSan = moves[moves.length-1];
            var betterMoveStr = $scope.getBetterMoveStr(bestMoveSan, lastMoveSan);
            var typeStr = $scope.getType(moves);
            var className = typeStr + "-move";
            var evaluationAndDepthStr = $scope.getEvaluationAndDepthStr(moves);
            var numStr = $scope.getMoveNumberStr(move.color, $scope.moveNumber);
            var moveEl = $(document.createElement('span')).addClass(className).html(numStr + move.san + betterMoveStr +' ')
            	.attr('title', evaluationAndDepthStr);
            $scope.pgnElements.push(moveEl);
            $('#analyzed-pgn').append(moveEl);
        };

        $scope.getMoveNumberStr = function(moveColor, moveNumber) {
            return (moveColor == "w") ? (moveNumber + ".") : "";
        };
        
        $scope.getEvaluationAndDepthStr = function(moves) {
        	var evaluation = baseUpdater.getEvaluation(moves);
            var str = "";
            if(evaluation && evaluation.v) {
                str += evaluation.v;
                if(evaluation.d) {
                    str += " " + evaluation.d;
                }
            }
            return str;
        };

        /* returns "unknown"/"best"/"wrong"*/
        $scope.getType = function (moves) {
            return baseUpdater.validateMoves(moves);
        };

        $scope.back = function() {
            if($scope.moveNumber == 0) return;
            var move = analyzeChessGame.undo();
            if(move.color == 'w') $scope.moveNumber--;
            $scope.board.position(analyzeChessGame.fen());
            $($scope.pgnElements.pop()).remove();
        };

        $scope.reload = function() {
            while($scope.moveNumber !== 0) {
                $scope.back();
            }
        }
        
        $scope.switchOrientation = function() {
            $scope.board.orientation(($scope.board.orientation() == 'white') ? 'black' : 'white');
        };

        $scope.getBetterMoveStr = function(bestMoveSan, lastMoveSan) {
            return (bestMoveSan && bestMoveSan!=lastMoveSan) ? "("+bestMoveSan+"!)" : "";
        };

        /*
        $scope.trainBranch = function() {
            var position = analyzeChessGame.history();
            trainMode.branch(position);
        };*/
    }]);
