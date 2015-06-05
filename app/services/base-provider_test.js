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
        it("set 'wb'-white/black & 'b'-black position types for first line", function () {
            myBase.push({m: "d4"}, {m: "e4"});
            var returnedBase = baseProvider.getAll();
            expect(returnedBase).toEqual([{m: "d4", t: "wb"}, {m: "e4", t: "b"}]);
        })
    })
});
