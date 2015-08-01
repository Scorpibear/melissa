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

    });
});