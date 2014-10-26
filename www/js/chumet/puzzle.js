// presents chess puzzle - the chess position and best move to answer
// progress - percentage of learning, from 0 to 100
function Puzzle(position, bestMove){
    this.position = position;
    this.bestMove = bestMove;
    this.progress = 0;
    this.MAX_PERCENT = 100;
    this.lastLearnt = Date();
    this.solved = function(){
        var solvedPercentIncrement = 20;
        if(LearningStrategy.QUICK_MODE)
            solvedPercentIncrement = 100;
        this.progress+=solvedPercentIncrement;
        if(this.progress > Puzzle.MAX_PERCENT)
            this.progress = Puzzle.MAX_PERCENT;
        this.lastLearnt = Date();
    };
    this.failed = function(){
        var precision = 10;
        this.progress = Math.floor(this.progress / 2 / precision) * precision;
    };
    this.isLearnt = function(){
        return this.progress == Puzzle.MAX_PERCENT;
    }
}

Puzzle.MAX_PERCENT = 100;