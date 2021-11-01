describe('board display', () => {
  const eco = {name: 'Amar Gambit'};
  
  beforeEach(module('melissa.boardDisplay'));
  
  describe('eco display directive', () => {
    let $compile, $rootScope;
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('shows opening name', () => {
      const element = $compile("<eco-display></eco-display>")($rootScope);
      const text = element.getText();
      expect(text).toContain(eco.name);
    });
  });
});
