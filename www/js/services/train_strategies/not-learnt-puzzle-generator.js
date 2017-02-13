"use strict";

angular.module("melissa.services")
  .factory("notLearntPuzzleGenerator", ['teacher', 'puzzleBuilder', 'baseIterator', function (teacher, puzzleBuilder, baseIterator) {
    var puzzleList = [];
    return {
      getNew: function() {
        var puzzle = puzzleList.shift();
        return puzzle;
      },
      reset: function() {
        puzzleList = [];
        var pgns = teacher.getListOfPgnsToLearn();
        if(Array.isArray(pgns)){
          pgns.forEach(function(pgn) {
            var puzzle = puzzleBuilder.buildFromPgn(pgn, baseIterator.getBestAnswer(pgn));
            puzzleList.push(puzzle);
          });
        }
      }
    }
  }]);
