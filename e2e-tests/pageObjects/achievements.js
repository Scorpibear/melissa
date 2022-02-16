const waiter = require("../dataObjects/timeManagementTool")

class Achievements {

    achievementsButton = element(by.css('[href="#!/js/achievements"]'));
    resetProgressButton = element(by.css('[ng-click="resetProgress()"]'));
    levelTextInAchievements = element(by.xpath('//*[@id="stats-list"]/li[1]/span[1]'));
    positionsLearnedInAchievements = element(by.xpath('//*[@id="stats-list"]/li[2]/span[1]'));
    tillNextlevelFieldInAchievements = element(by.xpath('//*[@id="stats-list"]/li[3]/span[1]'));

    clickOnAchievementsButton = () => {
        this.achievementsButton.click();
    }

    resetProgressButtonExistsOnPage = () => {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.resetProgressButton), this.defaultWaiterForFiveSecond);
    }
    
    validateLevelFieldInAchievementsPage = () => {
        browser.wait(() => {
            return this.levelTextInAchievements.getText().then((text) => {
            return text === "Level";
            });
        }, waiter.defaultWaiterForFiveSecond);
            expect(this.levelTextInAchievements.getText()).toEqual('Level');
    }
    
    validatePositionsLearnedInAchievementsPage = () => {
        browser.wait(() => {
            return this.positionsLearnedInAchievements.getText().then((text) => {
            return text === "Positions learnt";
            });
        }, waiter.defaultWaiterForFiveSecond);
            expect(this.positionsLearnedInAchievements.getText()).toEqual('Positions learnt');
    }
    
    validatetillNextlevelFieldInAchievementsPage = () => {
        browser.wait(() => {
            return this.tillNextlevelFieldInAchievements.getText().then((text) => {
            return text === "Positions left for the next level";
            });
        }, waiter.defaultWaiterForFiveSecond);
            expect(this.tillNextlevelFieldInAchievements.getText()).toEqual('Positions left for the next level');
    }
}

module.exports = new Achievements();