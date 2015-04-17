'use strict';

angular.module('melissa.achievements', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/achievements', {
            templateUrl: '/achievements.html',
            controller: 'AchievementsCtrl'
        });
    }])

    .controller('AchievementsCtrl', [function () {

    }]);