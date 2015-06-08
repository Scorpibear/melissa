'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('melissa', function () {

    browser.get('index.html');

    it('title is Melissa', function () {
        expect(browser.getTitle()).toEqual('Melissa');

    });

    it('puzzle is showned', function () {
        /*
         var puzzleProvider = {
         getPuzzle: function(){
         return {position: "1. d4", answer: "Nc6"}
         }
         };*/
        // some replace of puzzleProvider
        // force to display next position
        expect(element("position")).getText().equalTo("1. d4");
    })
});
