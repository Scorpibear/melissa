let analyze = function() {

    const analyzeButton = element(by.css('[href="#!/js/analyze"]'));
    const switchOrientationButton = element(by.css('[ng-click="switchOrientation()"]'));
    const analyzeChessPalette = element(by.id('analyze'))


    this.analyzeButtonExists = () => {
    expect(analyzeButton.isPresent()).toBe(true);
   }

   this.analyzeButtonClick = () => {
    analyzeButton.click();
   }

   this.switchOrientationButtonIsClickable = () => {
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(analyzeButton), 5000);
   }

    this.analyzeChessPaletteExists = () => {
    expect(analyzeChessPalette.isPresent()).toBe(true);
   }


}

module.exports = new analyze();