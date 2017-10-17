'use strict';

angular.module("melissa.services")
.factory("learningProgress", ['learningProgressSynchronizer', function(synchronizer) {
        var learntPuzzles = synchronizer.load([]);
        return {
            getPuzzlesLearnt: function () {
                return learntPuzzles.length;
            },
            markAsLearnt: function (puzzle) {
                if(!this.isLearnt(puzzle)) {
                    learntPuzzles.push(puzzle);
                    synchronizer.save(learntPuzzles);
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