function Puzzle(position, answer) {
    this.position = position;
    this.answer = answer;
}

angular.module('melissa.services')
    .factory('puzzleProvider', ['$timeout', 'puzzleGenerator', 'trainMode', 'learningProgress',
    function ($timeout, puzzleGenerator, trainMode, learningProgress) {
        var puzzles = [];
        var stackSize = 1;
        var prevStackSize = 0;
        var fillPuzzles = function () {
            stackSize = stackSize + prevStackSize;
            prevStackSize = stackSize - prevStackSize;
            for (var i = 0; i < stackSize; i++) {
                var puzzle = puzzleGenerator.getNew();
                while(puzzle && learningProgress.isLearnt(puzzle)) {
                    puzzle = puzzleGenerator.getNew();
                }
                if(puzzle != null) {
                    puzzles.push(puzzle);
                }
            }
        };
        $timeout(fillPuzzles, 0);
        return {
            getPuzzle: function () {
                if(puzzles.length == 0) {
                    var puzzle = puzzleGenerator.getNew();
                    if (puzzle != null) {
                        puzzles.push(puzzle);
                    }
                }
                var puzzle = puzzles.shift();
                if(puzzles.length == 0) {
                    $timeout(fillPuzzles, 0);
                }
                return puzzle;
            }
        };
    }]);
