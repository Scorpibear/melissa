'use strict';

angular.module("melissa.services")
  // convert pgn into differt representatio forms
  .factory("pgnConverter", function () {
    return {
      shortenPgn: function(position) {
        var startMoves = 7;
        var spacesInOneMove = 3;
        var shortenedSymbol = " <...> ";
        var endMoves = startMoves;
        var maxParts = (startMoves + endMoves) * spacesInOneMove;
        var shortenedPgn = position;
        var parts = shortenedPgn.split(' ');
        if(parts.length > maxParts) {
            shortenedPgn = 
              parts.slice(0, startMoves * spacesInOneMove).join(' ') + 
              shortenedSymbol + 
              parts.slice(parts.length - endMoves * spacesInOneMove, parts.length).join(' ');
        }
        return shortenedPgn;
      }
    };
  });
