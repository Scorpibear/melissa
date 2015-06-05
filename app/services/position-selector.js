angular.module("melissa.services")

    .factory("positionSelector", function () {
        var createIndependentSubObject = function (positionObject) {
            var subObject = positionObject.s[0];
            if (positionObject.m.search(" ") != -1) {
                subObject.m = "" + positionObject.n + "." + positionObject.m + " " + subObject.n + "." + subObject.m;
            } else {
                subObject.m = positionObject.m + " " + subObject.m;
            }
            subObject.t = positionObject.t;
            return subObject;
        };
        return {
            getBestSubPositions: function (positionObject) {
                var subPositions = [];
                if (positionObject.s.length) {
                    var subObject = createIndependentSubObject(positionObject);
                    // if type "wb" contains "b" or "b" contains "b"
                    console.log("subObject", subObject);
                    if (positionObject.t) {
                        if (positionObject.t.search(positionObject.c) != -1) {
                            subPositions.push(subObject);
                        } else {
                            // need to skip one level and go deeper
                            if (subObject.s.length) {
                                var subSubObject = createIndependentSubObject(subObject);
                                subPositions.push(subSubObject);
                            }
                        }
                    }
                }
                return subPositions;
            }
        }
    });