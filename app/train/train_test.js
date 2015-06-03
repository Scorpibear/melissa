'use strict';

describe('melissa.train module', function () {

    beforeEach(module('melissa.train'));

    describe('train controller', function () {

        it('is defined', inject(function ($controller) {
            //spec body
            var trainCtrl = $controller('TrainCtrl');
            expect(trainCtrl).toBeDefined();
        }));

    });
});