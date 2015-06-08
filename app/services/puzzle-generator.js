angular.module("melissa.services")
    .factory("puzzleGenerator", function (baseProvider, puzzleBuilder, positionSelector) {
        var activePositionList = baseProvider.getAll();
        var nextPositionList = [];
        var activeIndex = 0;
        return {
            getNew: function () {
                if (activeIndex < activePositionList.length) {
                    var positionObject = activePositionList[activeIndex];
                    var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
                    var bestSubPositions = positionSelector.getBestSubPositions(positionObject);
                    nextPositionList = nextPositionList.concat(bestSubPositions);
                    activeIndex++;
                    if (activeIndex == activePositionList.length) {
                        activePositionList = nextPositionList;
                        nextPositionList = [];
                        activeIndex = 0;
                    }
                    return puzzle;
                } else {
                    return null;
                }
            }
        }
    });
