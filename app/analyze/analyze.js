'use strict';

angular.module('melissa.analyze', ['ngRoute', 'melissa.messages', 'melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/analyze', {
            templateUrl: 'analyze/analyze.html'
        });
    }])
    .constant('analyzeChessGame', new Chess())
    .controller('AnalyzeController', ['$scope', '$document', 'analyzeChessGame', function ($scope, $document, analyzeChessGame) {

        $scope.position = '';
        $('#analyzed-pgn').html("");
        $scope.moveNumber = 0;

        $scope.registerPositionChange = function (move) {
            var numStr = (move.color == "w") ? "" + (++$scope.moveNumber) + ". " : "";
            var typeStr = $scope.getType(analyzeChessGame.pgn());
            var className = typeStr + "-move";
            var moveEl = $(document.createElement('span')).addClass(className).html(numStr + move.san + ' ');
            $('#analyzed-pgn').append(moveEl);
        };

        $scope.getType = function (pgn) {
            var types = ["unknown", "best", "wrong"];
            return types[Math.round(Math.random() * 3)];
        }
    }]);
