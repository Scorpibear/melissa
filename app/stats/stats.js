'use strict';

angular.module('melissa.stats', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/stats', {
            templateUrl: 'stats/stats.html'
        });
    }])

    .controller('StatsController', function ($scope) {
        $scope.positionsLearnt = 0;
        $scope.stats = [];
    });
