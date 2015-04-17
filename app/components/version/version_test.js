'use strict';

describe('melissa.version module', function () {
    beforeEach(module('melissa.version'));

    describe('version service', function () {
        it('should return current version', inject(function (version) {
            expect(version).toEqual('0.1');
        }));
    });
});
