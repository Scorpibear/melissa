'use strict';

angular.module("melissa.services")
  // tests teacher ideas, either to worth it for training right now or not
  .factory("ideaTester", ['learningProgress', 'baseIterator', function(learningProgress, baseIterator) {
    return {
      isGoodIdea: function(idea) {
        if(idea && idea.pgn) {
          var bestAnswer = baseIterator.getBestAnswer(idea.pgn);
          return !learningProgress.isLearnt(idea.pgn, bestAnswer);
        } else {
          return false;
        }
      }
    };
  }]);
