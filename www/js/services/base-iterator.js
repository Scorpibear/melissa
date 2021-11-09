'use strict';

angular.module("melissa.services")
  // interface for base to iterate through it. Depends on baseUpdater and positionSelector
  // Should be used instead of any other baseXXX services for base positions iteration.
  // operates with pgn as array of moves, moves as strings in algebraic notation
  .factory("baseIterator", ['baseUpdater', 'positionSelector', function (baseUpdater, positionSelector) {
    return {
      // input: pgn
      // output: pgn, extended with best known moves
      getBestPgn: function(startPgn) {
        var result = startPgn.slice();
        var position = positionSelector.getPositionByMoves(baseUpdater.getStart(), startPgn);
        while(position && position.s && position.s.length) {
          position = position.s[0];
          if(position.m) {
            result.push(position.m)
          } else {
            break;
          }
        }
        // check if we end with different color then start and remove the last half-move if not
        if(startPgn.length % 2 == result.length % 2) {
          result.pop();
        }
        return result;
      },
      // input: pgn
      // output: move
      getBestMoveSync: function(pgn) {
        var position = positionSelector.getPositionByMoves(baseUpdater.getStart(), pgn);
        var result = (position && position.s && position.s.length) ? position.s[0].m : undefined;
        return result;
      },
      getBestMove: moves => {
        return Promise.resolve(this.getBestMoveSync(moves));
      },
      // input: pgn
      // output: array of pgns
      getSubPgns: function(pgn) {
        var result = [];
        if(Array.isArray(pgn)) {
          var position = positionSelector.getPositionByMoves(baseUpdater.getStart(), pgn);
          if(position && position.s && position.s.length) {
            position.s.forEach(function(subPosition) {
              var subPgn = pgn.slice();
              subPgn.push(subPosition.m);
              result.push(subPgn);
            });
          }
        }
        return result;
      }
    };
  }]);