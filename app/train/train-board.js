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
                boardConfig.onDrop = function (source, target) {
                    var move = chessGame.move({
                        from: source,
                        to: target,
                        promotion: 'q'
                    });
                    var isCorrect = (move != null) && (move.san === scope.training.puzzle.answer);
                    chessGame.undo();
                    if (!isCorrect) {
                        return 'snapback';
                    } else {
                        var correctMessages = ["Correct!", "Exactly!", "Right!", "Yes!"];
                        scope.training.status = correctMessages[Math.round(Math.random() * correctMessages.length)];
                        scope.$apply();
                        scope.next();
                    }
                };
                if (window['ChessBoard'] !== undefined) {
                    var id = attrs["id"];
                    scope.board = new window.ChessBoard(id, boardConfig);
                }
                scope.showNextPuzzle();
            }
        };
    })
;
