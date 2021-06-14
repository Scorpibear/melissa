let achievements = function() {

    const achievementsButton = element(by.css('[href="#!/js/achievements"]'));
    const resetProgressButton = element(by.css('[ng-click="resetProgress()"]'));
    const levelTextInAchievements = element(by.xpath('//*[@id="stats-list"]/li[1]/span[1]'));
    const positionsLearnedInAchievements = element(by.xpath('//*[@id="stats-list"]/li[2]/span[1]'));
    const tillNextlevelFieldInAchievements = element(by.xpath('//*[@id="stats-list"]/li[3]/span[1]'));


    this.clickOnAchievementsButton = () => {
        achievementsButton.click();
    }

    this.resetProgressButtonExistsOnPage = () => {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(resetProgressButton), 5000);
    }
    
    this.validateLevelFieldInAchievementsPage = () => {
        browser.wait(function() {
            return levelTextInAchievements.getText().then(function(text) {
                console.log(text)
            return text === "Level";
            });
        }, 5000);
            expect(levelTextInAchievements.getText()).toEqual('Level');
    }
    
    this.validatePositionsLearnedInAchievementsPage = () => {
        browser.wait(function() {
            return positionsLearnedInAchievements.getText().then(function(text) {
                console.log(text)
            return text === "Positions learnt";
            });
        }, 5000);
            expect(positionsLearnedInAchievements.getText()).toEqual('Positions learnt');
    }
    
    this.validatetillNextlevelFieldInAchievementsPage = () => {
        browser.wait(function() {
            return tillNextlevelFieldInAchievements.getText().then(function(text) {
                console.log(text)
            return text === "Positions left for the next level";
            });
        }, 5000);
            expect(tillNextlevelFieldInAchievements.getText()).toEqual('Positions left for the next level');
    }
}

module.exports = new achievements();