'use strict';

angular.module("melissa.services")
  // provides moves of games which could be learnt, no validation is learnt or not, but only best moves line for the color to go
  .factory("teacherIdeas", ['baseIterator', function(baseIterator) {
    function init(ideasContainer) {
      // algorithms of idea creation is the following
      // take root - reuse it for white - all white positions will begin with it
      var idea = {pgn:[]};
      // add it to white backlog for extension
      ideasContainer.pushIdea(idea);
      // it is also valid idea to train;
      ideasContainer.addIdea(idea);
      // take all answers to root - it will be start for all black positions;
      // all of them are also valid positions for train
      addSubIdeas(ideasContainer, idea);
    }
    function addSubIdeas(ideasContainer, idea) {
      var subPgns = baseIterator.getSubPgns(idea.pgn);
      subPgns.forEach(function(subPgn){
        if(subPgn && subPgn.length) {
          var newIdea = {pgn: subPgn.slice()};
          ideasContainer.pushIdea(newIdea);
          ideasContainer.addIdea(newIdea);
        }
      });  
    };
    function extendIdeas(ideasContainer) {
      var ideas = ideasContainer.popIdeas();
      ideas.forEach(function(idea) {
        var bestMove = baseIterator.getBestAnswer(idea.pgn);
        if(idea.pgn && idea.pgn.length) {
          var newPgn = idea.pgn.slice();
          newPgn.push(bestMove);
          var subIdea = {pgn: newPgn};
          addSubIdeas(ideasContainer, subIdea);
        }
      });  
    };
    return {
      getIdea: function(ideasContainer) {
        if(ideasContainer.isEmpty()) {
          init(ideasContainer);
        }
        var idea = ideasContainer.getIdea();
        if(!idea) {
          extendIdeas(ideasContainer);
          idea = ideasContainer.getIdea();
        }
        return idea;
      },
      areEqual: function(ideaA, ideaB) {
        if(ideaA && ideaB && ideaA.pgn && ideaB.pgn && ideaA.pgn.length == ideaB.pgn.length) {
          for(var i = 0; i < ideaA.pgn.length; i++) {
            if(ideaA.pgn[i] != ideaB.pgn[i]) {
              return false;
            }
          }
          return true;
        }
        return false;
      }
    };
  }]);
