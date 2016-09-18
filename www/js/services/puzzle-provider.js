function Puzzle(position, answer) {
    this.position = position;
    this.answer = answer;
}

angular.module('melissa.services')
    .factory('puzzleProvider', ['$timeout', 'puzzleGenerator', 'learningProgress',
    function ($timeout, puzzleGenerator, learningProgress) {
        var puzzles;
        function reset() {
            puzzleGenerator.reset();
            puzzles = [];
            fill();
        };
        function fill() {
            var puzzle = puzzleGenerator.getNew();
            if(puzzle) {
                puzzles.push(puzzle);
            }
        }
        reset();
        return {
            getPuzzle: function () {
                var puzzle = null;
                if(puzzles && puzzles.length) {
                    puzzle = puzzles.shift();
                }
                if(puzzles && puzzles.length==0) {
                    $timeout(fill);
                }
                return puzzle;
            },
            reset: function() {
                reset();
            }
        };
    }]);
