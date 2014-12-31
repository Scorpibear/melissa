// presents chess puzzle - the chess position and best move to answer
// progress - percentage of learning, from 0 to 100
function Puzzle(position, bestMove){
    this.position = position;
    this.bestMove = bestMove;
    this.progress = 0;
    this.MAX_PERCENT = 100;
    this.lastLearnt = new Date().getTime();
    this.minLearningInterval = Puzzle.BASE_MIN_LEARNING_INTERVAL;
    this.solved = function(){
        var solvedPercentIncrement = 20;
        if(LearningStrategy.QUICK_MODE)
            solvedPercentIncrement = 100;
        this.progress+=solvedPercentIncrement;
        if(this.progress > Puzzle.MAX_PERCENT)
            this.progress = Puzzle.MAX_PERCENT;
        this.lastLearnt = new Date().getTime();
        this.minLearningInterval*=Puzzle.LEARNING_INTERVAL_FACTOR;
    };
    this.failed = function(){
        var precision = 10;
        this.progress = Math.floor(this.progress / 2 / precision) * precision;
        this.minLearningInterval = Puzzle.BASE_MIN_LEARNING_INTERVAL;
    };
    this.isLearnt = function(){
        return this.progress == Puzzle.MAX_PERCENT;
    };
    this.isTimeToLearn = function(){
        if(this.isLearnt()){
            return (((new Date().getTime()) - this.lastLearnt)>this.minLearningInterval);
        } else {
            return true;
        }
    };
}

Puzzle.MAX_PERCENT = 100;
Puzzle.BASE_MIN_LEARNING_INTERVAL = 12000; // 12 seconds in milliseconds
Puzzle.LEARNING_INTERVAL_FACTOR = 2;
Puzzle.createFromJSON = function(obj){
    var puzzle = new Puzzle();
    for(var property in obj) {
        if(obj.hasOwnProperty(property))
            puzzle[property]=obj[property];
    }
    return puzzle;
}