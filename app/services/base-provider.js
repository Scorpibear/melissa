'use strict';

angular.module("melissa.services")
    .value("base", base)
    .factory("baseProvider", ['$http', 'base', 'positionSelector', function ($http, base, positionSelector) {
        var baseUpdated = false;
        $http.get('http://localhost:9966/').
            success(function (data) {
                console.log("success");
                var f = new Function(data + " return base;");
                base = f();
                console.log("received base", base);
                baseUpdated = true;
            });
        var makeFen = function (positionObject) {
            return positionObject.n + "." + positionObject.m;
        };

        // prepare
        // update with specification of position types in new property 't':
        //      "wb" - good for white & black,
        //      "b" - for black only
        // set fen
        var prepare = function (positions) {
            if (positions.length) {
                positions[0].t = "wb";
                positions[0].fen = makeFen(positions[0]);
                for (var i = 1, l = positions.length; i < l; i++) {
                    positions[i].t = "b";
                    positions[i].fen = makeFen(positions[i]);
                }
            }
        };
        prepare(base);
        var createStartObject = function () {
            return {fen: "", t: "wb", s: base}
        };
        return {
            getStart: function () {
                return createStartObject();
            },
            getBestSubPositions: function (positionObject) {
                console.log("baseUpdated", baseUpdated);
                if (baseUpdated) {
                    positionObject = createStartObject();
                    baseUpdated = false;
                }
                return positionSelector.getBestSubPositions(positionObject);
            }
        }
    }]);
