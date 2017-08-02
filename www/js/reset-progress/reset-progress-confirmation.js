'use strict';

angular.module('melissa.resetProgress', [])
  .controller('resetProgressController', [function() {

  }])
  .factory('resetProgressConfirmation', [function() {
    return {
      show: function() {
        var confirmed = true; // should depend on user output
        var promise = new Promise(function(resolve){resolve(confirmed)});
        return promise;
      }
    }
  }]);
