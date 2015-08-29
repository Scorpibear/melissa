'use strict';

angular.module("melissa.services")
    .factory("moveValidator", function () {
        var findObjectWithMove = function(positionObject, moveSan) {
            for(var i = 0, l = positionObject.s.length; i < l; i++) {
                if(positionObject.s[i].m == moveSan) {
                    return positionObject.s[i];
                }
            }
            return null;
        };
        return {
            validate: function(moves, base) {
                var currentObject = base;
                var i, l;
                var result = "best"; // until it would be proven wrong
                for(i = 0, l = moves.length; i < l; i++) {
                    if(currentObject && currentObject.s && currentObject.s.length>0) {
                        if (currentObject.s[0].m == moves[i]) {
                            result = "best";
                            currentObject = currentObject.s[0];
                        } else {
                            if (result == "wrong path") {
                                result = "wrong";
                                break;
                            } else {
                                result = "wrong path";
                            }
                            currentObject = findObjectWithMove(currentObject, moves[i]);
                        }
                    } else {
                        if( result == "wrong path") {
                            result == "wrong"
                            break
                        } else {
                            result = "unknown"
                        }
                    }
                }
                result = (result == "wrong path") ? "wrong" : result;
                return result;
            }
        }
    });
