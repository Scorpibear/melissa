angular.module("melissa.bestGames")
    .directive("melissaBestGamesBoard", ['chessGame', '$window', 'chessMoveConverter', 'highlighter',
    function (chessGame, $window, chessMoveConverter, highlighter) {
        var boardConfig = {
            draggable: true,
            pieceTheme: 'js/bower_components/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
            position: 'start',
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
                if ($window['ChessBoard'] !== undefined) {
                    scope.board = new $window.ChessBoard(id, boardConfig);
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
                    var isCorrect = (move != null) && (move.san === scope.training.puzzle.answer);
                    if (!isCorrect) {
                        scope.training.solvedFromFirstTry = false;
                        var squares = chessMoveConverter.sanToSquares(scope.training.puzzle.answer, chessGame.turn());
                        if(move) {
                          squares.push(move.from);
                        }
                        chessGame.undo();
                        highlighter.highlightSquares(squares, id);
                        return 'snapback';
                    } else {
                        scope.registerCorrectAnswer();
                    }
                };
            }
        };
    }]);
