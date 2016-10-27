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
        var bestSubPositions = baseProvider.getBestSubPositions(root);
        if(bestSubPositions) {
          bestSubPositions.forEach(function(positionObject) {
            var alternativeGame = gameCreator.create(positionObject);
            if(gameCreator.isBetter(alternativeGame, game)) {
              activeGame = alternativeGame;
            }
          }); 
        }
      }
    }
  });
