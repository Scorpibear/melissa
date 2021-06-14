let training = function () {

    const trainingButton = element(by.css('[href="#!/js/train-mode-selection"]'));
    const analyzeButton = element(by.css('[href="#!/js/analyze"]'));
    const achievementsButton = element(by.css('[href="#!/js/achievements"]'));
    const trainModeSelection = element(by.xpath('//*[@id="trainModeSelection"]/h1'));
    const bestMovesText = element(by.xpath('//*[@id="train"]/p[1]'));
    const bestGamesButton = element(by.id("bestGames"));
    const watchGameBoardPallette = element(by.id("watch-games-board"));
    const watchAndRememberButton = element(by.id("watchAndRemember"));
    const bestMovesButton = element(by.id("bestMoves"));
    const trainBoardPalette = element(by.id("train-board"));


    this.clickOnTrainingButton =function (){
        trainingButton.click();
   }

   this.validateTrainModeSelection = () =>{
    browser.wait(function() {
        return trainModeSelection.getText().then(function(text) {
        return text === "Choose the way how to train your memory and chess intuition";
        });
    }, 5000);
        expect(trainModeSelection.getText()).toEqual('Choose the way how to train your memory and chess intuition');
   }
   

   this.validateBestMovesText = () =>{
    browser.wait(function() {
        return bestMovesText.getText().then(function(text) {
        return text === "What is the best move?";
        });
    }, 5000);
    expect(bestMovesText.getText()).toEqual('What is the best move?');
}

   this.clickOnBestButton = () => {
        bestGamesButton.click();
   }

   this.clickOnWatchAndRememberButton = () => {
        watchAndRememberButton.click();
   }

   this.clickOnBestMovesButton = () => {
        bestMovesButton.click();
   }

   this.trainBoardPatelleExists = () => {
        expect(trainBoardPalette.isPresent()).toBe(true);
   }

   this.analyzeButtonExists = () => {
        expect(analyzeButton.isPresent()).toBe(true);
   }

   this.achievementsButtonExists = () => {
        expect(achievementsButton.isPresent()).toBe(true);
   }

   this.watchGameBoardPalletteExists = () => {
        expect(watchGameBoardPallette.isPresent()).toBe(true);
   }
}

module.exports = new training();