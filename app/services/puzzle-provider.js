angular.module('melissa.services')
    .service('puzzleProvider', function () {
        var puzzles = [{position: "1. d4", answer: "Nf6"}, {position: "1. e4", answer: "e6"}];
        this.getPuzzle = function () {
            return puzzles.pop();
        };
    });
