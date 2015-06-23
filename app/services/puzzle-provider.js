function Puzzle(position, answer) {
    this.position = position;
    this.answer = answer;
}

angular.module('melissa.services')
    .factory('puzzleProvider', function ($timeout, puzzleGenerator) {
        var puzzles = [];
        var stackSize = 1;
        var prevStackSize = 0;
        var fillPuzzles = function () {
            stackSize = stackSize + prevStackSize;
            prevStackSize = stackSize - prevStackSize;
            for (var i = 0; i < stackSize; i++) {
                var puzzle = puzzleGenerator.getNew();
                if (puzzle != null) {
                    puzzles.push(puzzle);
                }
            }
        };
        fillPuzzles();
        return {
            getPuzzle: function () {
                var puzzle = puzzles.shift();
                if(puzzles.length == 0) {
                    $timeout(fillPuzzles, 0);
                }
                return puzzle;
            }
        };
    });
