'use strict';

angular.module("melissa.services")
.constant('storageKey', 'melissa.learntPuzzles')
.factory("learningProgressSynchronizer", ['$window', 'storageKey', function($window, storageKey) {
  return {
    save: function(puzzles) {
      $window.localStorage.setItem(storageKey, JSON.stringify(puzzles))
    },
    load: function(defaultValue) {
      var result = defaultValue;
      var learntPuzzlesJson = $window.localStorage.getItem(storageKey);
      if(learntPuzzlesJson) {
        try {
          var result = JSON.parse(learntPuzzlesJson);
          if(Array.isArray(result)) {
            result = result.filter(function(puzzle){
              return (puzzle && puzzle.hasOwnProperty('position') && puzzle.answer);
            });
          } else {
            return defaultValue;
          }
        } catch (err) {
          console.error("Could not parse learntPuzzles from localStorage: " + err)
        }
      }
      return result;
    }
  }
}]);
