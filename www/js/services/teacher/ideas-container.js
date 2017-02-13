'use strict';

angular.module("melissa.services")
  // store ideas
  // idea - {pgn: [...]}
  .factory("ideasContainer", [function() {
    var backlog = [];
    var ideas = [];
    return {
      // returns if no ideas at all
      isEmpty: function() {
        return backlog.length == 0;
      },
      // push idea to backlog
      pushIdea: function(idea) {
        backlog.push(idea);
      },
      // add idea to get it later
      addIdea: function(idea) {
        ideas.push(idea);
      },
      // get idea from list of ideas added
      getIdea: function() {
        return ideas.shift();
      },
      // pop ideas from backlog, empties it
      popIdeas: function() {
        var backlogIdeas = backlog;
        backlog = [];
        return backlogIdeas;
      },
      // empties backlog and ideas
      reset: function() {
        backlog = [];
        ideas = [];
      }
    };
  }]);
