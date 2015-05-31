function Puzzle(position, answer) {
    this.position = position;
    this.answer = answer;
}

angular.module('melissa.services', [])
    .factory('puzzleProvider', function () {
        var puzzles = [
            new Puzzle("1. d4", "Nf6"),
            new Puzzle("1. e4", "e6")
        ];
        return {
            getPuzzle: function () {
                return puzzles.pop();
            }
        };
    });
