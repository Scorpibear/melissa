angular.module("melissa.footer", [])
  .directive('melissaFooter', [function() {
    return {
      link: function(scope, element, attrs) {
        var states = {"default":"default", "good":"good", "no":"no"};
        scope.connectionState = states.default;
      },
      templateUrl: 'js/footer/footer.html'
    };
  }]);