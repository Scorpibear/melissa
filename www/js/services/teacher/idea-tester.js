'use strict';

angular.module("melissa.services")
  // tests teacher ideas, either to worth it for training right now or not
  .factory("ideaTester", ['learningProgress', 'baseIterator', 'puzzleBuilder', function(learningProgress, baseIterator, puzzleBuilder) {
    return {
      isGoodIdea: function(idea) {
        if(idea && idea.pgn) {
          var bestAnswer = baseIterator.getBestMoveSync(idea.pgn);
          if(bestAnswer) {
            var isNotLearnt = !(learningProgress.isLearnt(puzzleBuilder.buildFromPgn(idea.pgn, bestAnswer)));
            return isNotLearnt;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    };
  }]);
