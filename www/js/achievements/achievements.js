'use strict';

angular.module('melissa.achievements', 
    ['ngRoute', 'melissa.messages', 'melissa.services', 'melissa.resetProgress'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/js/achievements', {
            templateUrl: 'js/achievements/achievements.html'
        });
    }])

    .controller('AchievementsController', [
        '$scope', 'learningProgress', 'resetProgressConfirmation',
        function ($scope, learningProgress, resetProgressConfirmation) {
        $scope.getPositionLearnt = function() {
            return learningProgress.getPuzzlesLearnt();
        };
        $scope.getLevel = function() {
            var puzzlesLeft = learningProgress.getPuzzlesLearnt();
            var level = 0;
            var prevStep = 1;
            var step = prevStep;
            while(puzzlesLeft >= step) {
                level++;
                puzzlesLeft -= step;
                var oldStep = step;
                step += prevStep;
                prevStep = oldStep;
            }
            return level;
        };
        $scope.getToLearnForNextLevel = function() {
            var puzzlesLeft = learningProgress.getPuzzlesLearnt();
            var prevStep = 1;
            var step = prevStep;
            var toLearn = step - puzzlesLeft;
            while(toLearn <= 0) {
                var oldStep = step;
                step += prevStep;
                prevStep = oldStep;
                toLearn = toLearn + step;
            }
            return toLearn;
        };
        $scope.resetProgress = function() {
            return new Promise(function(resolve, reject) {
                resetProgressConfirmation.show()
                .then(function(confirmed) {
                    if(confirmed) {
                        learningProgress.reset();
                        $scope.$apply();
                    }
                    resolve(confirmed);
                });
            });
        }
    }]);