"use strict";

angular.module("melissa.services")
  .factory("connectionIndicator", [function() {
    var states = {default: "default", unclear: "unclear", good: "good", no: "no"};
    var state = states.default;
    var refreshCallback = null;
    var refresh = function() {
      if(refreshCallback) {
        refreshCallback(state);
      }
    }
    return {
      startSending: function() {
        state = states.unclear;
        refresh();
      },
      success: function() {
        state = states.good;
        refresh();
      },
      error: function() {
        state = states.no;
        refresh();
      },
      refresh: function(callback) {
        refreshCallback = callback;
      }
    }
  }]);
