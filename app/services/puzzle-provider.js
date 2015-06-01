function Puzzle(position, answer) {
    this.position = position;
    this.answer = answer;
}

angular.module('melissa.services')
    .factory('puzzleProvider', function (puzzleGenerator) {
        var puzzles = [];
        for (var i = 0; i < 5; i++) {
            var puzzle = puzzleGenerator.getNew();
            if (puzzle != null) {
                puzzles.push(puzzle);
            }
        }
        return {
            getPuzzle: function () {
                return puzzles.shift();
            }
        };
    });
