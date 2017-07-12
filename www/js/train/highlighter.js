'use strict';

angular.module('melissa.train')
  .factory('highlighter', function () {
    return {
      highlightSquare: function (square, id) {
        var squareEl = $('#' + id + ' .square-' + square);
        squareEl.css('background', '#FFFF80');
      },
      highlightSquares: function (squares, id) {
        var self = this;
        squares.forEach(function(item) {self.highlightSquare(item, id)});
      }
    }
  });
