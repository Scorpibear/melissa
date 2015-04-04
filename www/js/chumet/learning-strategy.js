// know what to learn next
function LearningStrategy(puzzles){
    this.puzzleQueue = [];
    this.learningPuzzles = puzzles;
    this.puzzleGenerator = new PuzzleGenerator(base, puzzles);

    this.getNextPuzzle = function(){
        this.refillQueue();
        var puzzle =  this.puzzleQueue.shift();
        return puzzle;
    };

    this.refillQueue = function(){
        if(this.puzzleQueue.length>0)
            return;
        this.addOldest();
        var learningToAddNumber = 5;
        this.addRandomFromLearning(learningToAddNumber);
        this.addNew();
    };
    this.addOldest = function(){
        var oldestPuzzle = null;
        for(var i=0;i<this.learningPuzzles.length;i++){
            var puzzle = this.learningPuzzles[i];
            if(!puzzle.isTimeToLearn())
                continue;
            if(oldestPuzzle){
                if(puzzle.lastLearnt < oldestPuzzle.lastLearnt)
                    oldestPuzzle = puzzle;
            } else {
                oldestPuzzle = puzzle;
            }
        }
        if(oldestPuzzle){
            this.puzzleQueue.push(puzzle);
        }
    };
    this.moveToEnd = function(index){
        var puzzle = this.learningPuzzles[index];
        this.learningPuzzles.splice(index, 1);
        this.learningPuzzles.push(puzzle);
    };
    this.addRandomFromLearning = function(number){
        var maxIndex = this.learningPuzzles.length-1;
        var toAdd = Math.min(number, maxIndex);
        while(toAdd>0 && maxIndex>=0){
            var indexToAdd = Math.floor(Math.random()*maxIndex);
            var puzzle = this.learningPuzzles[indexToAdd];
            if(!puzzle.isLearnt()){
                this.puzzleQueue.push(puzzle);
                toAdd--;
            }
            this.moveToEnd(indexToAdd);
            maxIndex--;
        }
    };
    this.addNew = function(){
        var newPuzzle = this.puzzleGenerator.generate();
        if(newPuzzle) {
            this.learningPuzzles.push(newPuzzle);
            this.puzzleQueue.push(newPuzzle);
        }
    };
}

LearningStrategy.QUICK_MODE = false;