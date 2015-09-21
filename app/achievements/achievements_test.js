'use strict';

describe('melissa.achievements module', function () {
    var $controller;

    beforeEach(module('melissa.achievements'));

    describe('achievements controller', function () {
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it('should be defined', function () {
            var $scope = {};
            var achievementsCtrl = $controller('AchievementsController', {$scope: $scope});
            expect(achievementsCtrl).toBeDefined();
        });
        describe('getLevel', function() {
            var $scope = {};
            var learningProgress = {getPuzzlesLearnt: function() {}};
            beforeEach(function() {
                var achievementsCtrl = $controller('AchievementsController', {$scope: $scope, learningProgress: learningProgress});
            });
            it('returns 0 for 0 positions learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(0);
                expect($scope.getLevel()).toEqual(0)
            });
            it('returns 1 for 1 position learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(1);
                expect($scope.getLevel()).toEqual(1);
            });
            it('returns 1 for 2 position learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(2);
                expect($scope.getLevel()).toEqual(1);
            });
            it('returns 2 for 3 position learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(3);
                expect($scope.getLevel()).toEqual(2);
            });
            it('returns 2 for 5 position learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(5);
                expect($scope.getLevel()).toEqual(2);
            });
            it('returns 3 for 6 position learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(6);
                expect($scope.getLevel()).toEqual(3);
            });
        });
        describe('getToLearnForNextLevel', function() {
            var $scope = {};
            var learningProgress = {getPuzzlesLearnt: function() {}};
            beforeEach(function() {
                var achievementsCtrl = $controller('AchievementsController', {$scope: $scope, learningProgress: learningProgress});
            });
            it('returns 1 for 0 positions learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(0);
                expect($scope.getToLearnForNextLevel()).toEqual(1);
            });
            it('returns 2 for 1 positions learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(1);
                expect($scope.getToLearnForNextLevel()).toEqual(2);
            });
            it('returns 1 for 2 positions learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(2);
                expect($scope.getToLearnForNextLevel()).toEqual(1);
            });
            it('returns 3 for 3 positions learnt', function() {
                spyOn(learningProgress, 'getPuzzlesLearnt').and.returnValue(3);
                expect($scope.getToLearnForNextLevel()).toEqual(3);
            })

        })

    });
});