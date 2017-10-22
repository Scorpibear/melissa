angular.module("melissa.messages")
  .factory('language', ['$window', function($window) {
    defaultCode = 'en';
    function removeHyphen(element) {
      return element.split('-')[0];
    }
    return {
      getCode: function(available) {
        var code = removeHyphen($window.navigator.language);
        if(available.indexOf(code) === -1) {
          for(index in $window.navigator.languages) {
            code = removeHyphen($window.navigator.languages[index]);
            if(available.indexOf(code) !== -1) {
              return code;
            }
          };
          code = available[0];
        }
        return code;
      }
    };
  }]);
