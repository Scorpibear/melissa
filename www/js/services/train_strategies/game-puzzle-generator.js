'use strict';

angular.module("melissa.services")
  .factory("gamePuzzleGenerator", function (baseProvider, puzzleBuilder, gameCreator) {
    var activeGame;
    return {
      getNew: function() {
        var positionObject = (activeGame && activeGame.length) ? activeGame.shift() : null;
        var puzzle = (positionObject) ? puzzleBuilder.buildFromPositionObject(positionObject): null;
        return puzzle;
      },
      reset: function() {
        this.start();
      },
      start: function() {
        var root = baseProvider.getStart();
        var game = gameCreator.create(root);
        activeGame = game;
        var positionsQueue = [];
        var bestSubPositions = baseProvider.getBestSubPositions(root);
        var depth = 3;
        while(bestSubPositions && bestSubPositions.length && depth > 0) {
          positionsQueue.push.apply(positionsQueue, bestSubPositions);
          bestSubPositions = bestSubPositions.reduce(function(prev, value) {
            prev.push.apply(prev, baseProvider.getBestSubPositions(value));
            return prev;
          }, []);
          depth--;
        };
        positionsQueue.forEach(function(positionObject) {
          var alternativeGame = gameCreator.create(positionObject);
          if(gameCreator.isBetter(alternativeGame, activeGame)) {
            activeGame = alternativeGame;
          }
        });
      }
    }
  });
