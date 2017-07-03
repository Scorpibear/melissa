"use strict";

angular.module("melissa.services")
  .factory("continuousPuzzleGenerator", function (baseUpdater, puzzleBuilder) {
    var activePositionList, nextPositionList, activeIndex;
    var init = function() {
      activePositionList = [];
      nextPositionList = [];
      activeIndex = 0;
      activePositionList.push(baseUpdater.getStart());
    }
    init();
    return {
      getNew: function() {
        if (activeIndex < activePositionList.length) {
          var positionObject = activePositionList[activeIndex];
          var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
          var bestSubPositions = baseUpdater.getBestSubPositions(positionObject);
          bestSubPositions = bestSubPositions.filter(function(pos){return pos.s && pos.s.length && pos.s.length>0});
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
      },
      init: function() {
        init();
      }
    }
  });
