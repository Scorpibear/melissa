angular.module('melissa.boardDisplay', [])
.directive('ecoDisplay', function() {
  let latestEco = {code: "A00", name: "Amar Gambit"};
  let currentEco = fen2eco($scope.fen);
  let eco = currentEco || latestEco;
  return {
    scope: {fen: '=fen'},
    template: '<div id="eco"><strong>{{eco.code}}</strong> {{eco.name}}</div>'
  };
  function fen2eco(fen) {
    return undefined;
  }
});