'use strict';

const moveListUrlParam = "moveList";

angular.module('melissa.analyze', ['ngRoute', 'melissa.messages', 'melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/js/analyze', {
            templateUrl: 'js/analyze/analyze.html',
            reloadOnSearch: false
        });
    }])
    .constant('analyzeChessGame', new Chess())
    .controller('AnalyzeController', ['$scope', 'analyzeChessGame', 'baseUpdater', 'trainMode', '$location',
        function ($scope, analyzeChessGame, baseUpdater, trainMode, $location) {
        $('#analyzed-pgn').html("");
        $scope.moveNumber = 0;
        $scope.pgnElements = [];
        analyzeChessGame.reset();

        $scope.registerPositionChange = function(move, updateUrl = true) {
            if (updateUrl) {
                $scope.updateUrl();
            }
            if(move.color == "w") {
                $scope.moveNumber++;
            }
            $scope.$apply();
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
            if(evaluation && evaluation.hasOwnProperty('v')) {
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
            $scope.updateUrl();
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

        $scope.getMovesFromUrl = () => {
            const params = $location.search();
            const moveListStr = params[moveListUrlParam];
            return moveListStr ? moveListStr.split(/[+ ]/) : [];
        }

        $scope.applyUrlParams = () => {
            const moveList = $scope.getMovesFromUrl();
            moveList.forEach(sanMove => {
                const move = analyzeChessGame.move(sanMove);
                if(move != null) {
                    $scope.registerPositionChange(move, false);
                    $scope.board.position(analyzeChessGame.fen())
                }
            });
            $scope.updateUrl();
        }

        $scope.updateUrl = () => {
            const moves = analyzeChessGame.history();
            const movesStr = moves.join('+');
            const original = window.encodeURIComponent;
            window.encodeURIComponent = str => decodeURI(str);
            $location.search(moveListUrlParam, movesStr);
            window.encodeURIComponent = original;
        }

        setTimeout($scope.applyUrlParams, 0);
    }]);
