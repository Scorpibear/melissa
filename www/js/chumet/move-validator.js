// validate move for correctness
function MoveValidator(){
    this.chessGame = new Chess();

    this.reactOnMove = function(move){
        // TODO: eliminate global reference to chumet
        var puzzle = chumet.puzzle;
        var isTheBest = (move.san == puzzle.bestMove);
        if (isTheBest) {
            puzzle.solved();
            $('#pgn').html(this.chessGame.pgn()+"!");
        } else {
            puzzle.failed();
        }
        var goodHint = "Excellent! The position learning progress: " + puzzle.progress + "%";
        var badHint = "There is a better move than " + move.san + ", try again.";
        var hint = (isTheBest) ? goodHint : badHint;
        $('#status').html(hint);
        return isTheBest;
    };
}