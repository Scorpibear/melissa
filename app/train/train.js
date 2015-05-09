'use strict';

angular.module('melissa.train', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/train', {
            templateUrl: 'train/train.html',
            controller: 'TrainCtrl'
        });
    }])

    .controller('TrainCtrl', function ($scope) {
        if (window['ChessBoard'] !== undefined) {
            var boardElementId = "board";
            $scope.config = {
                pieceTheme: 'bower_components/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
                position: 'start'
            };
            $scope.chessBoard = new window.ChessBoard(boardElementId, $scope.config);
        }
    });