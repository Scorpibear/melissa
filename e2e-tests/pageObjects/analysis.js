let analyze = () => {

    const analyzeButton = element(by.css('[href="#!/js/analyze"]'));
    const analyzeChessPalette = element(by.id('analyze'))


    this.analyzeButtonExists = () => {
    expect(analyzeButton.isPresent()).toBe(true);
   }

    this.analyzeChessPaletteExists = () => {
    expect(analyzeChessPalette.isPresent()).toBe(true);
   }


}

module.exports = new analyze();