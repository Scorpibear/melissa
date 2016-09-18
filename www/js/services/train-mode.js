'use strict';

angular.module('melissa.services')
    .factory('trainMode', function () {
        var modes = {branch: "branch", continuous: "continuous", game: "game"}
        var branch = []
        var mode = modes.continuous;
        return {
            branch: function(moves) {
                branch = moves;
                mode = modes.branch;
            },
            isGame: function() {
                return mode == modes.game;
            },
            continuous: function() {
                mode = modes.continuous;
            },
            game: function() {
                mode = modes.game;
            }
        }
    });
