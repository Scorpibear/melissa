'use strict';

angular.module("melissa.services")
    .factory("chessMoveConverter", [
        function () {
            return {
                sanToSquare: function(san) {
                    var lastSymbol = san.substr(-1);
                    return (lastSymbol == "+" || lastSymbol == "#") ?
                        san.substr(-3, 2) :
                        san.substr(-2);
                }
            };
        }]
);