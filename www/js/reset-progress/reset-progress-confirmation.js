'use strict';

angular.module('melissa.resetProgress', ['melissa.messages'])
  .controller('resetProgressController', [function() {

  }])
  .factory('resetProgressConfirmation', ['$window', 'messages', function($window, messages) {
    return {
      show: function() {
        return new Promise(function(resolve, reject) {
          var confirmed = $window.confirm(messages.get('Do you really want to reset all progress you have made and start from the very beginning?'));
          if(confirmed) {
            var output = $window.prompt(messages.get('Type CONFIRM if you really want to reset all your achievements'))
            confirmed = output == messages.get('CONFIRM');
          }
          return resolve(confirmed);
        })
      }
    }
  }]);
