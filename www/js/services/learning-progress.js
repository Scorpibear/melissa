'use strict';

angular.module("melissa.services")
.constant('storageKey', 'melissa.learntPuzzles')
.factory("learningProgress", ['$window', 'storageKey', function($window, storageKey) {
        var learntPuzzles = [];
        var learntPuzzlesJson = $window.localStorage.getItem(storageKey);
        if(learntPuzzlesJson) {
            try {
                var result = JSON.parse(learntPuzzlesJson);
                if(Array.isArray(result)) {
                    learntPuzzles = result.filter(function(puzzle){return (puzzle && puzzle.position && puzzle.answer);});
                }
            } catch (err) {
                console.error("Could not parse learntPuzzles from localStorage: " + err)
            }
        }
        return {
            getPuzzlesLearnt: function () {
                return learntPuzzles.length;
            },
            markAsLearnt: function (puzzle) {
                if(!this.isLearnt(puzzle)) {
                    learntPuzzles.push(puzzle);
                    $window.localStorage.setItem(storageKey, JSON.stringify(learntPuzzles))
                }
            },
            isLearnt: function (puzzle) {
                if(puzzle) {
                    for(var i=0; i<learntPuzzles.length; i++) {
                        if(learntPuzzles[i].position == puzzle.position) {
                            if(learntPuzzles[i].answer == puzzle.answer) {
                                return true;
                            } else {
                                learntPuzzles.splice(i, 1);
                                return false;
                            }
                        }
                    }
                }
                return false;
            },
            reset: function() {
                learntPuzzles = []
            }
        }
    }]);