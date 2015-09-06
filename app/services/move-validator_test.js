'use strict';

describe("moveValidator", function () {
    var moveValidator;

    beforeEach(module("melissa.services"));
    beforeEach(inject(function (_moveValidator_) {
        moveValidator = _moveValidator_;
    }));

    var base = {m: '', s: [
        {m: "d4", s:[
            {m: "Nf6"},
            {m: "e6", s: [
                {m: "e4"}]}]},
        {m: "e4", n: 1}]};

    describe("validate", function() {
        it("return unknown for unknown paths", function() {
            var result = moveValidator.validate(["d4", "Nf6", "h3"], base);
            expect(result).toEqual("unknown");
        });
        it("return best for best path", function() {
            var result = moveValidator.validate(["d4"], base);
            expect(result).toEqual("best");
        });
        it("return wrong for wrong path", function() {
            var result = moveValidator.validate(["d4", "d5"], base);
            expect(result).toEqual("wrong");
        });
        it("wrong for not the best answer", function() {
            var result = moveValidator.validate(["d4", "e6", "h3"], base);
            expect(result).toEqual("wrong");
        });
        it("best for best answer on wrong move", function() {
            var result = moveValidator.validate(["d4", "e6", "e4"], base);
            expect(result).toEqual("best");
        });
        it("should be unknown if answer on wrong path is unknown", function() {
            var result = moveValidator.validate(["d4", "d5", "c4"], base);
            expect(result).toEqual("unknown");
        });
        it("should be wrong if answer on wrong move is unknown (no need to evaluate)", function() {
            var result = moveValidator.validate(["d4", "e6", "h4"], base)
            expect(result).toEqual("wrong")
        });
        it("should be wrong even if asked very deep (no need to evaluate)", function() {
            var result = moveValidator.validate(["d4", "e6", "h4", "Nc3"], base)
            expect(result).toEqual("wrong")
        })
    })
});
