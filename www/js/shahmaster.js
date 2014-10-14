var validator = {
    game:   new Chess(),

    // do not pick up pieces if the game is over
    // only pick up pieces for the side to move
    onDragStart: function(source, piece, position, orientation) {
            if (validator.game.game_over() === true ||
                (validator.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (validator.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false;
            }
    },

    onDrop: function(source, target) {
        // see if the move is legal
        var move = validator.game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return 'snapback';

        if(!shahmaster.reactOnMove(move)) {
            validator.game.undo();
            return 'snapback';
        }
    }
};


var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: validator.onDragStart,
    onDrop: validator.onDrop
};

var shahmaster = {
    pgnElement: $('#pgn'),
    statusElement: $('#status'),
    app: $('#app'),
    positionIndex: 0,
    position: "1.d4",
    bestMove: "Nf6",

    reactOnMove:    function(move){
        var goodHint = move.san + "! EXCELLENT!!!";
        var badHint = "There is a better move than " + move.san + ", try again.";
        var isTheBest = (move.san == shahmaster.bestMove);
        var hint = (isTheBest) ? goodHint : badHint;
        shahmaster.statusElement.html(hint);
        if (isTheBest) {
            shahmaster.pgnElement.html(validator.game.pgn());
            // TODO: progress.good(shahmaster.position, shahmaster.bestMove);
        } else {
            // TODO: progress.bad(shahmaster.position, shahmaster.bestMove);
        }
        return isTheBest;
    },

    board: new ChessBoard('board', cfg),

    // update the board position after the piece snap
        // for castling, en passant, pawn promotion
    updateBoard: function() {
        shahmaster.board.position(validator.game.fen());
        shahmaster.pgnElement.html(validator.game.pgn());
    },

    resetPosition: function() {
        var pgn = ['', shahmaster.position].join('\n');
        validator.game.load_pgn(pgn);
        var orientation = (validator.game.turn() == 'w') ? 'white' : 'black';
        shahmaster.board.orientation(orientation);
        shahmaster.updateBoard();
        shahmaster.statusElement.html('');
    },

    getNextPositionIndex: function(){
        return Math.floor(Math.random()*positions.length);
    },

    nextPosition: function() {
        //shahmaster.nextPositionFromFixedPositions();
        shahmaster.nextPositionFromBase();
    },

    nextPositionFromFixedPositions: function() {
        var nextPositionIndex = shahmaster.getNextPositionIndex();
        while(nextPositionIndex == shahmaster.positionIndex)
            nextPositionIndex = shahmaster.getNextPositionIndex();
        shahmaster.positionIndex = nextPositionIndex;
        var positionObject = positions[shahmaster.positionIndex];
        shahmaster.position = positionObject.p;
        shahmaster.bestMove = positionObject.b;
    },

    nextPositionFromBase:   function() {
        var maxDepth = 50;
        var depth = Math.floor(Math.random()*maxDepth);
        var baseContainer = base;
        var position = "";
        var bestMove;
        // for what side it's position - who will provide an answer
        // wb - for main line, when both are playing ideally
        var positionType = "wb"; // "wb", "w", "b";
        // go as deep as we could until stumble upon any blocks
        while(depth>=0){
            // let's select random position from the list
            var posIndex = Math.floor(Math.random()*baseContainer.length);
            var positionObject = baseContainer[posIndex];

            // TODO: extract validation method
            // if it's not evaluated - stop.
            // if there are no subnodes, it means no answer - stop.
            // if best answer in subnode is not evaluated - stop.
            if(!positionObject.e || positionObject.s.length==0 || !positionObject.s[0].e
                || (positionObject.s[0].n - positionObject.n)>1 || (positionObject.s[0].n - positionObject.n)<0)
                break;
            // if main line become not main, time to specify position - white or black
            if((positionType=="wb")&&(posIndex!=0))
                positionType=positionObject.s[0].c;
            // add separator if it's not the very first move in position
            if(!((positionObject.n == 1)&&(positionObject.c=='w')))
                position += " ";
            // adding number with point if it's white
            if(positionObject.c=='w')
                position += positionObject.n + ".";
            position += positionObject.m;
            bestMove = positionObject.s[0].m;
            // going deeper to change container
            baseContainer = positionObject.s;
            depth--;
            // if depth ended but position type does not meet position object, increase the depth.
            if((depth==-1)&&(positionType.search(positionObject.s[0].c)==-1))
                depth++;
        }
        shahmaster.position = position;
        shahmaster.bestMove = bestMove;
    },

    showBest: function() {
        shahmaster.resetPosition();
        validator.game.move(shahmaster.bestMove);
        shahmaster.updateBoard();
    },

    setupHandlers: function() {
        document.getElementById('retry').onclick = function() {
            shahmaster.resetPosition();
        };
        document.getElementById('best').onclick = function() {
            shahmaster.showBest();
        };
        document.getElementById('next').onclick = function() {
            shahmaster.nextPosition();
            shahmaster.resetPosition();
        };
    },

    // Application Constructor
    initialize: function() {
        shahmaster.nextPosition();
        shahmaster.resetPosition();
        shahmaster.setupHandlers();
        shahmaster.board.onSnapEnd = shahmaster.updateBoard;
    }
};


