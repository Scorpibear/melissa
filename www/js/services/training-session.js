'use strict';

angular.module('melissa.services')
    .factory('trainingSession', [function() {
      var isInProgress = false;
      var numberOfCorrectAnswers = 0;
      var numberOfAnswers = 0;
      var limit = undefined;
      return {
        start: function(sessionLimit) {
          isInProgress = true;
          numberOfCorrectAnswers = 0;
          numberOfAnswers = 0;
          limit = sessionLimit;
        },
        isInProgress: function() {
          return isInProgress;
        },
        register: function(data) {
          if(data.correct) {
            numberOfCorrectAnswers++;
          }
          numberOfAnswers++;
          if(limit && numberOfAnswers>=limit) {
            isInProgress = false;
          }
        },
        getNumberOfCorrectAnswers: function() {
          return numberOfCorrectAnswers;
        },
        getNumberOfAnswers: function() {
          return numberOfAnswers;
        }
      };
    }]);
