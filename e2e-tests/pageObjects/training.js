const waiter = require("../dataObjects/timeManagementTool")

class Training {

     trainingButton = element(by.css('[href="#!/js/train-mode-selection"]'));
     analyzeButton = element(by.css('[href="#!/js/analyze"]'));
     achievementsButton = element(by.css('[href="#!/js/achievements"]'));
     trainModeSelection = element(by.xpath('//*[@id="trainModeSelection"]/h1'));
     bestMovesText = element(by.xpath('//*[@id="train"]/p[1]'));
     bestGamesButton = element(by.id("bestGames"));
     watchGameBoardPallette = element(by.id("watch-games-board"));
     watchAndRememberButton = element(by.id("watchAndRemember"));
     bestMovesButton = element(by.id("bestMoves"));
     trainBoardPalette = element(by.id("train-board"));
    
    clickOnTrainingButton = () =>{
        this.trainingButton.click();
   }

   validateTrainModeSelection = () =>{
    browser.wait(() => {
        return this.trainModeSelection.getText().then((text) => {
        return text === "Choose the way how to train your memory and chess intuition";
        });
    }, waiter.defaultWaiterForFiveSecond);
        expect(this.trainModeSelection.getText()).toEqual('Choose the way how to train your memory and chess intuition');
   }
   

   validateBestMovesText = () =>{
    browser.wait(() => {
        return this.bestMovesText.getText().then((text) => {
        return text === "What is the best move?";
        });
    }, waiter.defaultWaiterForFiveSecond);
    expect(this.bestMovesText.getText()).toEqual('What is the best move?');
}

   clickOnBestButton = () => {
     this.bestGamesButton.click();
   }

   clickOnWatchAndRememberButton = () => {
     this.watchAndRememberButton.click();
   }

   clickOnBestMovesButton = () => {
     this.bestMovesButton.click();
   }

   trainBoardPatelleExists = () => {
        expect(this.trainBoardPalette.isPresent()).toBe(true);
   }

   analyzeButtonExists = () => {
        expect(this.analyzeButton.isPresent()).toBe(true);
   }

   achievementsButtonExists = () => {
        expect(this.achievementsButton.isPresent()).toBe(true);
   }

   trainingButtonExists = () => {
        expect(this.trainingButton.isPresent()).toBe(true);
   }

   watchGameBoardPalletteExists = () => {
        expect(this.watchGameBoardPallette.isPresent()).toBe(true);
   }
}

module.exports = new Training();
