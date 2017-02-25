'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('melissa', function () {

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
});
