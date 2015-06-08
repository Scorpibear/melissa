angular.module("melissa.train")
    .directive("melissaTrainBoard", function (chessGame) {
        var boardConfig = {
            draggable: true,
            pieceTheme: 'bower_components/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
            onDragStart: function (source, piece, position, orientation) {
                // only pick up pieces for the side to move
                if ((orientation === 'white' && piece.search(/^b/) !== -1) ||
                    (orientation === 'black' && piece.search(/^w/) !== -1)) {
                    return false;
                }
            }
        };
        return {
            link: function (scope, element, attrs) {
                var id = attrs["id"];
                var highlightSquare = function (square) {
                    var squareEl = $('#' + id + ' .square-' + square);
                    squareEl.css('background', '#FFFF80');
                };
                boardConfig.onDrop = function (source, target) {
                    var move = chessGame.move({
                        from: source,
                        to: target,
                        promotion: 'q'
                    });
                    var isCorrect = (move != null) && (move.san === scope.training.puzzle.answer);
                    if (move != null)
                        chessGame.undo();
                    if (!isCorrect) {
                        highlightSquare(scope.training.puzzle.answer.substr(-2));
                        return 'snapback';
                    } else {
                        scope.registerCorrectAnswer();
                    }
                };
                if (window['ChessBoard'] !== undefined) {
                    scope.board = new window.ChessBoard(id, boardConfig);
                }
                scope.showNextPuzzle();
            }
        };
    })
;
