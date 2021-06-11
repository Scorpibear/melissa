'use strict';
let training = require("../pageObjects/training");

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Training page tests', function () {
    browser.waitForAngularEnabled(false)

    beforeEach(function() {
    	browser.get('index.html');
    });

    it('title is Melissa', function () {
        expect(browser.getTitle()).toEqual('Melissa');

    });

    it('puzzle is showned', function () {
        element(by.id("bestMoves")).click();
        expect(element(by.id("positionValue")).getText()).toEqual("");
    })

    it('click on training button and validate main test', () => {
        training.ClickOnTrainingButton();
        training.ValidateTrainModeSelection();
    })

    it("Click on best games on training page and validate best games pallete shown", () => {
        training.ClickOnTrainingButton();
        training.ClickOnBestButton()
        training.TrainBoardPatelleExists()
    })

    it("Click on Watch and remember on training page and validate best games pallete shown", () => {
        training.ClickOnTrainingButton();
        training.ClickOnWatchAndRememberButton()
        training.WatchGameBoardPalletteExists()
    })

    it("Click on Best Moves on training page and validate best moves test shown", () => {
        training.ClickOnTrainingButton();
        training.ClickOnBestMovesButton()
        training.ValidateBestMovesText()
    })

    it("analyze button exists on main page", () => {
        training.ClickOnTrainingButton();
        training.analyzeButtonExists();
    })

    it("analyze button exists on main page", () => {
        training.ClickOnTrainingButton();
        training.analyzeButtonExists();
    })

    it("achievements Button Exists on main page", () => {
        training.ClickOnTrainingButton();
        training.achievementsButtonExists();
    })
});
