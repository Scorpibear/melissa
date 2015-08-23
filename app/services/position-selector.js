angular.module("melissa.services")

    .factory("positionSelector", function () {
        var createIndependentSubObject = function (positionObject, index) {
            index = index || 0;
            var subObject = positionObject.s[index];
            var newFen = positionObject.pgn + " ";
            if (subObject.c == 'w') {
                newFen += subObject.n + ".";
            }
            newFen += subObject.m;
            subObject.pgn = newFen;
            subObject.t = index ? positionObject.c : positionObject.t;
            return subObject;
        };
        return {
            getBestSubPositions: function (positionObject) {
                var subPositions = [];
                if (positionObject.s && positionObject.s.length) {
                    var subObject = createIndependentSubObject(positionObject);
                    if (positionObject.t) {
                        if (positionObject.t.search(positionObject.c) != -1) {
                            // wb & b, wb & w, b & b, w & w
                            subPositions.push(subObject);
                            if (positionObject.t == "wb") {
                                for (var i = 1, l = positionObject.s.length; i < l; i++) {
                                    var variationObject = createIndependentSubObject(positionObject, i);
                                    subPositions.push(variationObject);
                                }
                            }
                        } else {
                            // b & w, w & b
                            // need to skip one level and go deeper
                            if (subObject.s) {
                                for(var i = 0, l = subObject.s.length; i < l; i++) {
                                    var subSubObject = createIndependentSubObject(subObject, i);
                                    subPositions.push(subSubObject);
                                }
                            }
                        }
                    }
                }
                return subPositions;
            }
        }
    });