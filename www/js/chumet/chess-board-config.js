// create chessboard config
function ChessBoardConfig(moveValidator){
    var chessGame = moveValidator.chessGame;
    var chessBoardConfig = {
        draggable: true,
        position: 'start',
        onDragStart: function(source, piece, position, orientation){
            // do not pick up pieces if the game is over
            // only pick up pieces for the side to move
            if (chessGame.game_over() === true ||
                (chessGame.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (chessGame.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false;
            };
        },
        onDrop: function(source, target) {
            // see if the move is legal
            var move = chessGame.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });

            // illegal move
            if (move === null) return 'snapback';

            if(!moveValidator.reactOnMove(move)) {
                chessGame.undo();
                return 'snapback';
            };
        }
    };
    return chessBoardConfig;
};