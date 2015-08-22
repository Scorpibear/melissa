'use strict';

angular.module('melissa.analyze', ['ngRoute', 'melissa.messages', 'melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/analyze', {
            templateUrl: 'analyze/analyze.html'
        });
    }])
    .constant('analyzeChessGame', new Chess())
    .controller('AnalyzeController', ['$scope', 'analyzeChessGame', 'baseProvider', function ($scope, analyzeChessGame, baseProvider) {
        $('#analyzed-pgn').html("");
        $scope.moveNumber = 0;
        $scope.pgnElements = [];

        $scope.registerPositionChange = function (move) {
            var numStr = (move.color == "w") ? "" + (++$scope.moveNumber) + ". " : "";
            $scope.$apply();
            var typeStr = $scope.getType(analyzeChessGame.history());
            var className = typeStr + "-move";
            var moveEl = $(document.createElement('span')).addClass(className).html(numStr + move.san + ' ');
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
    }]);
