'use strict';
let training = require("../pageObjects/training");
let analyze = require("../pageObjects/analyze");
let achievements = require("../pageObjects/achievements");
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

    it("analyze,achievements,training buttons exist on main page", () => {
        training.clickOnTrainingButton();
        training.analyzeButtonExists();
        training.achievementsButtonExists();
        training.trainingButtonExists();
    })
});

describe('analyzes page tests', function () {
    browser.waitForAngularEnabled(false)

    beforeEach(function() {
    	browser.get('index.html');
    });

    it('click on training button and validate main test', () => {
        analyze.analyzeButtonClick();
        analyze.analyzeChessPaletteExists();
    })

    it('click on training button and validate that switch orientation button is clickable', () => {
        analyze.analyzeButtonClick();
        analyze.switchOrientationButtonIsClickable();
    })

});

describe('achievements page tests', function () {
    browser.waitForAngularEnabled(false)

    beforeEach(function() {
    	browser.get('index.html');
    });

    it('click on achievements button and validate achievements page fields', () => {
        achievements.clickOnAchievementsButton();
        achievements.validateLevelFieldInAchievementsPage();
        achievements.validatePositionsLearnedInAchievementsPage();
        achievements.validatetillNextlevelFieldInAchievementsPage();
    })

    it('click on achievements button and validate reset progress button is clickable', () => {
        achievements.clickOnAchievementsButton();
        achievements.resetProgressButtonExistsOnPage()
    })
});
