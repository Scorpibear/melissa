angular.module("melissa.services")
    .factory("puzzleBuilder", function () {
        /*
         positionObject example:
         {
         pgn: "1.d4", m: 'd4', n: 1, c: 'w', e: {v: 0.13, d: 30},
         s: [
         {m: 'Nf6', n: 1, c: 'b', e: {v: 0.17, d: 33}
         ]
         }
         */
        var buildPositionFromObject = function (positionObject) {
            return positionObject ? positionObject.pgn : null;
        };
        var buildAnswerFromObject = function (positionObject) {
            if (positionObject && positionObject.s && positionObject.s.length) {
                return positionObject.s[0].m;
            } else {
                return null;
            }
        };
        return {
            buildFromPositionObject: function (positionObject) {
                var position = buildPositionFromObject(positionObject);
                var answer = buildAnswerFromObject(positionObject);
                if (answer) {
                    return new Puzzle(position, answer);
                } else {
                    return null;
                }
            }
        }
    });
