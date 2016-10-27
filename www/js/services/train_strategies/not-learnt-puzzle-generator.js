"use strict";

angular.module("melissa.services")
  .factory("notLearntPuzzleGenerator", 
    ['continuousPuzzleGenerator', 'learningProgress', 
    function (continuousPuzzleGenerator, learningProgress) {
    var previousPuzzle = null;
    var buffer = [];
    var addPuzzleToBuffer = function() {
      var puzzle = continuousPuzzleGenerator.getNew();
      buffer.push(puzzle);
      if(puzzle) setTimeout(addPuzzleToBuffer, 0);
    }
    var generator = {
      getNew: function() {
        addPuzzleToBuffer();
        return buffer.shift();
      }
    };
    return {
      getNew: function() {
        var puzzle = generator.getNew(); 
        while(puzzle && puzzle!=previousPuzzle && learningProgress && learningProgress.isLearnt && learningProgress.isLearnt(puzzle)) {
          previousPuzzle = puzzle;
          puzzle = generator.getNew();
        }
        return puzzle;
      },
      reset: function() {
      }
    }
  }]);
