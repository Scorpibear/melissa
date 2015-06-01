angular.module("melissa.services")
    .factory("puzzleBuilder", function () {
        /*
         positionObject example:
         {
         m: 'd4', n: 1, c: 'w', e: {v: 0.13, d: 30},
         s: [
         {m: 'Nf6', n: 1, c: 'b', e: {v: 0.17, d: 33}
         ]
         }
         */
        var buildPositionFromObject = function (positionObject) {
            return "" + positionObject.n + "." + positionObject.m;
        };
        var buildAnswerFromObject = function (positionObject) {
            return positionObject.s[0].m;
        };
        return {
            buildFromPositionObject: function (positionObject) {
                var position = buildPositionFromObject(positionObject);
                var answer = buildAnswerFromObject(positionObject);
                var puzzle = new Puzzle(position, answer);
                return puzzle;
            }
        }
    });
