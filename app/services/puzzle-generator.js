angular.module("melissa.services")
    .factory("puzzleGenerator", function (baseProvider, puzzleBuilder) {
        var source = baseProvider.getAll();
        var nextSource = [];
        var index = 0;
        return {
            getNew: function () {
                if (index < source.length) {
                    var positionObject = source[index];
                    var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
                    nextSource.push(positionObject.s);
                    index++;
                    if(index == source.length) {
                        source = nextSource;
                        nextSource = [];
                    }
                    return puzzle;
                } else {
                    return null;
                }
            }
        }
    });
