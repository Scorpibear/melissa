'use strict';

angular.module('melissa.stats', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/stats', {
            templateUrl: 'stats/stats.html',
            controller: 'StatsCtrl'
        });
    }])

    .controller('StatsCtrl', function ($scope) {
    });
