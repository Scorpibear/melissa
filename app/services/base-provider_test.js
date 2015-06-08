'use strict';

describe("baseProvider", function () {
    var baseProvider;
    var myBase = [];

    beforeEach(module("melissa.services"));
    beforeEach(module(function ($provide) {
        $provide.value("base", myBase);
    }));
    beforeEach(inject(function (_baseProvider_) {
        baseProvider = _baseProvider_;
    }));
    describe("getAll", function () {
        beforeEach(function () {
            while (myBase.length) {
                myBase.pop();
            }
        });
        it("set 'wb'-white/black & 'b'-black position types and fen for first line", function () {
            myBase.push({m: "d4", n: 1}, {m: "e4", n: 1});
            var returnedBase = baseProvider.getAll();
            expect(returnedBase).toEqual([{m: "d4", t: "wb", fen: "1.d4", n: 1}, {m: "e4", t: "b", fen: "1.e4", n: 1}]);
        });
    })
});
