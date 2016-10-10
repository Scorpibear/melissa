angular.module("melissa.services")
  .factory("gamePuzzleGenerator", function (baseProvider, puzzleBuilder, positionSelector) {
    var positionObject = null;
    return {
      getNew: function() {
        if(positionObject) {
          positionObject = positionSelector.getNextPositionOfTheColor(positionObject);
        } else {
          positionObject = baseProvider.getStart();
        }
        var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
        return puzzle;
      },
      reset: function() {
        
      }
    }
  });
