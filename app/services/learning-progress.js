'use strict';

angular.module("melissa.services")
.factory("learningProgress", function() {
        var learntPuzzlesJson = localStorage.getItem('melissa.learntPuzzles');
        var learntPuzzles = []
        if(learntPuzzlesJson) {
            try {
                learntPuzzles = JSON.parse(learntPuzzlesJson)
            } catch (err) {
                console.error("Could not parse learntPuzzles from localStorage: " + err)
            }
        }
        return {
            getPuzzlesLearnt: function () {
                return learntPuzzles.length;
            },
            markAsLearnt: function (puzzle) {
                learntPuzzles.push(puzzle)
                localStorage.setItem('melissa.learntPuzzles', JSON.stringify(learntPuzzles))
            },
            isLearnt: function (puzzle) {
                for(var i=0; i<learntPuzzles.length; i++) {
                    if(learntPuzzles[i].position == puzzle.position) {
                        return true;
                    }
                }
                return false;
            }
        }
    });