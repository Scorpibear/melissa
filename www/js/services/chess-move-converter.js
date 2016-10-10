'use strict';

angular.module("melissa.services")
  .factory("chessMoveConverter", [
    function () {
      return {
        // turn is 'w' or 'b'
        sanToSquares: function(san, turn) {
          var result = [];
          var map = {
            "w":{
              "O-O": ["g1", "f1"],
              "O-O-O": ["c1", "d1"]
            },
            "b": {
              "O-O": ["g8", "f8"],
              "O-O-O": ["c8", "d8"]
            }
          };
          if(map.hasOwnProperty(turn) && map[turn].hasOwnProperty(san)) {
            result = map[turn][san];
          } else {
            if(san.indexOf("=") !== -1) {
              result.push(san.substr(0, 2));
            } else {
              var lastSymbol = san.substr(-1);
              result.push((lastSymbol == "+" || lastSymbol == "#") ? san.substr(-3, 2) : san.substr(-2));
            }
          }
          return result;
        }
      };
    }]
);