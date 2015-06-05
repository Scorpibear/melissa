angular.module("melissa.services")
    .value("base", base)
    .factory("baseProvider", function (base) {

        // update with specification of position types in new property 't':
        //      "wb" - good for white & black,
        //      "b" - for black only
        var updateWithPositionTypes = function (positions) {
            if (positions.length) {
                positions[0].t = "wb";
                for (var i = 1, l = positions.length; i < l; i++) {
                    positions[i].t = "b";
                }
            }
        };
        return {
            getAll: function () {
                updateWithPositionTypes(base);
                return base;
            }
        }
    });
