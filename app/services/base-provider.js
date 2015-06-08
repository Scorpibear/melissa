angular.module("melissa.services")
    .value("base", base)
    .factory("baseProvider", function (base) {

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
        return {
            getAll: function () {
                prepare(base);
                return base;
            }
        }
    });
