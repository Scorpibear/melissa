'use strict';

angular.module("melissa.services")
  // provides moves of games which are good to learn right now
  .factory("gamesToLearn", ['baseIterator', 'teacher', function(baseIterator, teacher) {
    var listOfStartPgnsToLearn = [];
    const startPgnsCount = 5000;
    const getNextGame = () => {
      if(listOfStartPgnsToLearn.length == 0) {
        var listOfStartPgns = teacher.getListOfPgnsToLearn(startPgnsCount);
        // push all listOfStartPgns elements to listOfPgnsToLearn
        Array.prototype.push.apply(listOfStartPgnsToLearn, listOfStartPgns);
      }
      let startPgn = listOfStartPgnsToLearn.shift();
      startPgn = startPgn || [];
      const moves = baseIterator.getBestPgn(startPgn);
      const color = (startPgn.length % 2 == 0) ? 'white' : 'black';
      return {moves, color, trainIndex: startPgn.length};
    }
    return {
      // return game object with color and list of moves for the game to the end, all colors, algebraic notation, trainIndex
      // which game?
      getGame: function({minPly}={minPly:0}) {
        const attempts = startPgnsCount;
        for(let i=0, game = getNextGame(); i < attempts; i++, game = getNextGame()) {
          if(game && game.moves && game.moves.length >= minPly) {
            return game;
          }
        }
        return null;
      }
    };
  }]);
