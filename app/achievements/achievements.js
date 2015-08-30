'use strict';

angular.module('melissa.achievements', ['ngRoute','melissa.messages','melissa.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/achievements', {
            templateUrl: 'achievements/achievements.html',
            controller: 'AchievementsController'
        });
    }])

    .controller('AchievementsController', ['$scope', 'learningProgress', function ($scope, learningProgress) {
        $scope.getPositionLearnt = function() {
            return learningProgress.getPuzzlesLearnt()
        }
    }]);