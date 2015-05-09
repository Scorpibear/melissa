'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('melissa', function () {

    browser.get('index.html');

    it('title is Melissa', function () {
        expect(browser.getTitle()).toEqual('Melissa');

    });

});
