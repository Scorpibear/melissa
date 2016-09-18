"use strict";

angular.module("melissa.services")
  .factory("continuousPuzzleGenerator", function (baseProvider, puzzleBuilder) {
    var activePositionList = [], nextPositionList = [], activeIndex = 0;
    activePositionList.push(baseProvider.getStart());
    return {
      getNew: function() {
        if (activeIndex < activePositionList.length) {
          var positionObject = activePositionList[activeIndex];
          var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
          var bestSubPositions = baseProvider.getBestSubPositions(positionObject);
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
