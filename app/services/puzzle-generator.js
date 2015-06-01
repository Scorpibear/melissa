angular.module("melissa.services")
    .factory("puzzleGenerator", function (baseProvider, puzzleBuilder) {
        var base = baseProvider.getAll();
        var index = 0;
        return {
            getNew: function () {
                if (index < base.length) {
                    var positionObject = base[index];
                    var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
                    index++;
                    return puzzle;
                } else {
                    return null;
                }
            }
        }
    });
