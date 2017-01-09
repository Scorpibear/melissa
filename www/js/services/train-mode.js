'use strict';

angular.module('melissa.services')
    .factory('trainMode', function () {
        var modes = {branch: "branch", bestMoves: "bestMoves", bestGames: "bestGames", continuation: "continuation", video: "video"}
        var branch = []
        var mode = modes.bestMoves;
        return {
            continuous: function() {
                mode = modes.bestMoves;
            },
            game: function() {
                mode = modes.bestGames;
            },
            branch: function(moves) {
                branch = moves;
                mode = modes.branch;
            },
            isBestMoves: function() {
                return mode == modes.bestMoves;
            },
            isGame: function() {
                return mode == modes.bestGames;
            }
        }
    });
