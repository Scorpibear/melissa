angular.module("melissa.watchGames")
    .directive("melissaWatchGamesBoard", [function () {
        var boardConfig = {
            draggable: false,
            pieceTheme: 'js/bower_components/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
            position: 'start',
            onDragStart: function (source, piece, position, orientation) {
            }
        };        
        return {
            link: function (scope, element, attrs) {
                var id = attrs["id"];
                if (window['ChessBoard'] !== undefined) {
                    scope.board = new window.ChessBoard(id, boardConfig);
                }
            }
        };
    }]);
