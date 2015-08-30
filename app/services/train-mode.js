'use strict';

angular.module('melissa.services')
    .factory('trainMode', function () {
        var modes = {branch: "branch", firstMoves: "first moves", mainLine: "main line"}
        var branch = []
        var mode = modes.firstMoves
        return {
            branch: function(moves) {
                branch = moves;
                mode = modes.branch;
            }
        }
    });
