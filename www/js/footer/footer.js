angular.module('melissa.footer', ['melissa.services'])
  .directive('melissaFooter', ['connectionIndicator', function(connectionIndicator) {
    return {
      link: function(scope, element, attrs) {
        connectionIndicator.refresh(function(state) {
          scope.connectionState = state;
        });
      },
      templateUrl: 'js/footer/footer.html'
    };
  }]);