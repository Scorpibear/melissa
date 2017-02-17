angular.module("melissa.train")
    .directive("melissaTrainBoard", ['chessGame', 'chessMoveConverter', '$window', function (chessGame, chessMoveConverter, $window) {
        var boardConfig = {
            draggable: true,
            pieceTheme: 'js/bower_components/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
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
                var highlightSquares = function (squares) {
                    squares.forEach(function(item) {highlightSquare(item)});
                }
                boardConfig.onDrop = function (source, target) {
                	if(source == target) {
                		// it means that user returned piece to the same place, so need to do nothing, just give him another chance
                		return 'snapback';
                	}
                    var move = chessGame.move({
                        from: source,
                        to: target,
                        promotion: 'q'
                    });
                    var isCorrect = (move != null) && (move.san === scope.training.puzzle.answer);
                    if (move)
                        chessGame.undo();
                    if (!isCorrect) {
                        scope.training.solvedFromFirstTry = false;
                        var squares = chessMoveConverter.sanToSquares(scope.training.puzzle.answer, chessGame.turn());
                        highlightSquares(squares);
                        return 'snapback';
                    } else {
                        scope.registerCorrectAnswer();
                    }
                };
                boardConfig.onSnapEnd = function() {
                    chessGame.move(scope.training.puzzle.answer)
                    scope.board.position(chessGame.fen());
                };
                if ($window['ChessBoard'] !== undefined) {
                    scope.board = new $window.ChessBoard(id, boardConfig);
                }
                scope.showNextPuzzle();
            }
        };
    }])
;
