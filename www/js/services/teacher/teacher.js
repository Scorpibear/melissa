'use strict';

angular.module("melissa.services")
  // provides moves of games which are good to learn right now
  .factory("teacher", ['teacherIdeas', 'ideasContainer', 'ideaTester', function(teacherIdeas, ideasContainer, ideaTester) {
    return {
      getListOfPgnsToLearn: function(amount) {
        amount = amount || 10;
        ideasContainer.reset();
        var result = [];
        var idea, prevIdea;
        do {
          prevIdea = idea;
          idea = teacherIdeas.getIdea(ideasContainer);
          if(teacherIdeas.areEqual(idea, prevIdea)) {
            break;
          }
          if(idea && idea.pgn) {
            if(ideaTester.isGoodIdea(idea)) {
              result.push(idea.pgn);
            }
          } else {
            break;
          }
        } while(result.length < amount);
        return result;
      }
    };
  }]);
