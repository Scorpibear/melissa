angular.module("melissa.train")
    .directive("melissaTrainBoard", ['chessGame', '$window', 'highlighter', 
        function (chessGame, $window, highlighter) {
        var boardConfig = {
            draggable: true,
            pieceTheme: 'js/bower_components/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
            position: 'start'
        };
        return {
            link: function (scope, element, attrs) {
                var id = attrs["id"];
                boardConfig.onDragStart = function (source, piece, position, orientation) {
                    // only pick up pieces for the side to move
                    if ((orientation === 'white' && piece.search(/^b/) !== -1) ||
                        (orientation === 'black' && piece.search(/^w/) !== -1) ||
                        !scope.training.puzzle) {
                        return false;
                    }
                }
                boardConfig.onDrop = function (source, target) {
                	if(source == target || !scope.training.puzzle) {
                		// it means that user returned piece to the same place, so need to do nothing, just give him another chance
                		return 'snapback';
                	}
                    var move = chessGame.move({
                        from: source,
                        to: target,
                        promotion: 'q'
                    });
                    if(move) {
                        // make board to display correctly such things like castling and promotion, so do real move on snapEnd only
                        chessGame.undo(); 
                    }
                    var isCorrect = (move != null) && (move.san === scope.training.puzzle.answer);
                    if (!isCorrect) {
                        scope.training.solvedFromFirstTry = false;
                        let squares = [];
                        if(move) {
                            const move = chessGame.move(scope.training.puzzle.answer);
                            if(move) {
                                squares.push(move.from);
                                squares.push(move.to);
                                chessGame.undo();
                            }
                        }
                        highlighter.highlightSquares(squares, id);
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
            }
        };
    }])
;
