angular.module('melissaEcoDisplay', [])
.directive('ecoDisplay', function(fen) {
  let latestEco = {code: "A00", name: "Amar Gambit"};
  let currentEco = fen2eco(fen);
  let eco = currentEco || latestEco;
  return {
    template: '<div id="eco"><strong>{{eco.code}}</strong> {{eco.name}}</div>'
  };
  function fen2eco(fen) {
    return undefined;
  }
});