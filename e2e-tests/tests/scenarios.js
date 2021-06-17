'use strict';
const trainingInstance = require("../pageObjects/training");
const analyzeInstance = require("../pageObjects/analyze");
const achievementsInstance = require("../pageObjects/achievements");
/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Training page tests', () => {
    
    beforeAll(() => {
        browser.waitForAngularEnabled(false)
    });

    beforeEach(() => {
    	browser.get('index.html');
    });

    it('title is Melissa',() => {
        expect(browser.getTitle()).toEqual('Melissa');

    });

    it('puzzle is showned',() => {
        element(by.id("bestMoves")).click();
        expect(element(by.id("positionValue")).getText()).toEqual("");
    })

    it('click on training button and validate main test', () => {
        trainingInstance.clickOnTrainingButton();
        trainingInstance.validateTrainModeSelection();
    })

    it("Click on best games on training page and validate best games pallete shown", () => {
        trainingInstance.clickOnTrainingButton();
        trainingInstance.clickOnBestButton()
        trainingInstance.trainBoardPatelleExists()
    })

    it("Click on Watch and remember on training page and validate best games pallete shown", () => {
        trainingInstance.clickOnTrainingButton();
        trainingInstance.clickOnWatchAndRememberButton()
        trainingInstance.watchGameBoardPalletteExists()
    })

    it("Click on Best Moves on training page and validate best moves test shown", () => {
        trainingInstance.clickOnTrainingButton();
        trainingInstance.clickOnBestMovesButton()
        trainingInstance.validateBestMovesText()
    })

    it("analyze,achievements,training buttons exist on main page", () => {
        trainingInstance.clickOnTrainingButton();
        trainingInstance.analyzeButtonExists();
        trainingInstance.achievementsButtonExists();
        trainingInstance.trainingButtonExists();
    })
});

describe('analyzes page tests',() => {

    beforeAll(() => {
        browser.waitForAngularEnabled(false)
    });

    beforeEach(() => {
    	browser.get('index.html');
    });

    it('click on training button and validate main test', () => {
        analyzeInstance.analyzeButtonClick();
        analyzeInstance.analyzeChessPaletteExists();
    })

    it('click on training button and validate that switch orientation button is clickable', () => {
        analyzeInstance.analyzeButtonClick();
        analyzeInstance.switchOrientationButtonIsClickable();
    })

});

describe('achievements page tests',() => {

    beforeAll(() => {
        browser.waitForAngularEnabled(false)
    });

    beforeEach(() => {
    	browser.get('index.html');
    });

    it('click on achievements button and validate achievements page fields', () => {
        achievementsInstance.clickOnAchievementsButton();
        achievementsInstance.validateLevelFieldInAchievementsPage();
        achievementsInstance.validatePositionsLearnedInAchievementsPage();
        achievementsInstance.validatetillNextlevelFieldInAchievementsPage();
    })

    it('click on achievements button and validate reset progress button is clickable', () => {
        achievementsInstance.clickOnAchievementsButton();
        achievementsInstance.resetProgressButtonExistsOnPage()
    })
});
