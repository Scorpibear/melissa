'use strict';

angular.module('melissa.achievements', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/achievements', {
            templateUrl: 'achievements/achievements.html',
            controller: 'AchievementsController'
        });
    }])

    .controller('AchievementsController', ['$scope', function ($scope) {
        $scope.positionsLearnt = 0;
        $scope.stats = [];
    }]);