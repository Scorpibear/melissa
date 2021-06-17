const waiter = require("../dataObjects/timeManagementTool")

class Analyze {

    analyzeButton = element(by.css('[href="#!/js/analyze"]'));
    switchOrientationButton = element(by.css('[ng-click="switchOrientation()"]'));
    analyzeChessPalette = element(by.id('analyze'))

    analyzeButtonExists = () => {
        expect(this.analyzeButton.isPresent()).toBe(true);
   }

    analyzeButtonClick = () => {
        this.analyzeButton.click();
   }

    switchOrientationButtonIsClickable = () => {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.switchOrientationButton), waiter.defaultWaiterForFiveSecond);
   }

    analyzeChessPaletteExists = () => {
        expect(this.analyzeChessPalette.isPresent()).toBe(true);
   }
}

module.exports = new Analyze();