'use strict';

angular.module("melissa.services")
  // provides moves of games which are good to learn right now
  .factory("teacher", ['teacherIdeas', 'ideasContainer', 'ideaTester', function(teacherIdeas, ideasContainer, ideaTester) {
    return {
      getListOfPgnsToLearn: function(amount) {
        amount = amount || 10;
        var result = [];
        var idea, prevIdea;
        do {
          prevIdea = idea;
          idea = teacherIdeas.getIdea(ideasContainer);
          if(teacherIdeas.areEqual(idea, prevIdea)) {
            break;
          }
          if(ideaTester.isGoodIdea(idea)) {
            result.push(idea.pgn);
          }
        } while(result.length < amount);
        return result;
      }
    };
  }]);
