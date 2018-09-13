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
            let puzzlesLeft = learningProgress.getPuzzlesLearnt();
            let level = 0;
            let step = 10;
            while(puzzlesLeft >= step) {
                level++;
                puzzlesLeft -= step;
                step += 5;
            }
            return level;
        };
        $scope.getToLearnForNextLevel = function() {
            var puzzlesLeft = learningProgress.getPuzzlesLearnt();
            let step = 10;
            let toLearn = step - puzzlesLeft;
            while(toLearn <= 0) {
                step += 5;
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