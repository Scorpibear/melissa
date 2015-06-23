'use strict';

angular.module('melissa.achievements', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/achievements', {
            templateUrl: 'achievements/achievements.html',
            controller: 'AchievementsCtrl'
        });
    }])

    .controller('AchievementsCtrl', ['$scope', function ($scope) {
        $scope.positionsLearnt = 0;
        $scope.stats = [];
    }]);