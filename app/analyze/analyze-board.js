angular.module("melissa.analyze")
    .directive("melissaAnalyzeBoard", ['analyzeChessGame', function (analyzeChessGame) {
        var boardConfig = {
            draggable: true,
            pieceTheme: 'bower_components/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
            position: 'start',
            onDragStart: function (source, piece, position, orientation) {
            }
        };        
        return {
            link: function (scope, element, attrs) {
                var id = attrs["id"];
                boardConfig.onDrop = function (source, target) {
                    var move = analyzeChessGame.move({
                        from: source,
                        to: target,
                        promotion: 'q'
                    });
                    var isCorrect = (move != null);
                    if (isCorrect) {
                        scope.registerPositionChange(move);
                        // to display castling, en-passant, promotion
                        scope.board.position(analyzeChessGame.fen());
                    } else {
                        return 'snapback';
                    }
                };
                if (window['ChessBoard'] !== undefined) {
                    scope.board = new window.ChessBoard(id, boardConfig);
                }
            }
        };
    }]);
