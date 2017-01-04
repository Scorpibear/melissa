'use strict';

angular.module("melissa.services")
  .factory("gameCreator", ['positionSelector', 'learningProgress', 'puzzleBuilder', function (positionSelector, learningProgress, puzzleBuilder) {
    
    return {
      create: function(positionObject) {
        var game = [];
        while(positionObject && positionObject.s && positionObject.s.length) {
          game.push(positionObject);
          positionObject = positionSelector.getNextPositionOfTheColor(positionObject);
        }
        return game;
      },
      isBetter: function(game1, game2) {
        var game1NotLearntPositions = this.getNotLearntPositionsCount(game1);
        var game2NotLearntPositions = this.getNotLearntPositionsCount(game2);
        return game1NotLearntPositions > game2NotLearntPositions;
      },
      getNotLearntPositionsCount: function(game) {
        var count = 0;
        game.forEach(function(positionObject) {
          if(learningProgress && learningProgress.isLearnt) {
            var puzzle = puzzleBuilder.buildFromPositionObject(positionObject);
            if(!learningProgress.isLearnt(puzzle)) {
              count++;
            }
          } else {
            count++;
          }  
        });
        return count;
      }
    }
  }]);
