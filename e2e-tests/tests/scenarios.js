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
        training.clickOnTrainingButton();
        training.validateTrainModeSelection();
    })

    it("Click on best games on training page and validate best games pallete shown", () => {
        training.clickOnTrainingButton();
        training.clickOnBestButton()
        training.trainBoardPatelleExists()
    })

    it("Click on Watch and remember on training page and validate best games pallete shown", () => {
        training.clickOnTrainingButton();
        training.clickOnWatchAndRememberButton()
        training.watchGameBoardPalletteExists()
    })

    it("Click on Best Moves on training page and validate best moves test shown", () => {
        training.clickOnTrainingButton();
        training.clickOnBestMovesButton()
        training.validateBestMovesText()
    })

    it("analyze button exists on main page", () => {
        training.clickOnTrainingButton();
        training.analyzeButtonExists();
    })

    it("analyze button exists on main page", () => {
        training.clickOnTrainingButton();
        training.analyzeButtonExists();
    })

    it("achievements Button Exists on main page", () => {
        training.clickOnTrainingButton();
        training.achievementsButtonExists();
    })
});
