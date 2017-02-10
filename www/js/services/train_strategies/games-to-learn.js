'use strict';

angular.module("melissa.services")
  // provides moves of games which are good to learn right now
  .factory("gamesToLearn", ['baseIterator', 'teacher', function(baseIterator, teacher) {
    var listOfStartPgnsToLearn = [];
    return {
      // return game object with color and list of moves for the game to the end, all colors, algebraic notation
      // which game?
      getGame: function() {
        if(listOfStartPgnsToLearn.length == 0) {
          var listOfStartPgns = teacher.getListOfPgnsToLearn();
          // push all listOfStartPgns elements to listOfPgnsToLearn
          Array.prototype.push.apply(listOfStartPgnsToLearn, listOfStartPgns);
        }
        var startPgn = listOfStartPgnsToLearn.shift();
        startPgn = startPgn || [];
        var game = {
          moves: baseIterator.getBestPgn(startPgn),
          color: (startPgn.length % 2 == 0) ? 'white' : 'black'
        };
        return game;
      }
    };
  }]);
