// know what to learn next
function LearningStrategy(puzzles){
    this.puzzleQueue = [];
    this.learningPuzzles = puzzles;
    this.positionBase = base;
    this.positionObjectValidator = new PositionObjectValidator();
    this.getNextPuzzle = function(){
        this.refillQueue();
        var puzzle = this.puzzleQueue.shift();
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
        var oldestPuzzleIndex = 0;
        for(var i=0;i<this.learningPuzzles.length;i++){
            if(this.learningPuzzles[i].lastLearnt < this.learningPuzzles[oldestPuzzleIndex].lastLearnt){
                oldestPuzzleIndex = i;
            }
        };
        this.addToQueueAndMoveToEnd(oldestPuzzleIndex);
    };
    this.addToQueueAndMoveToEnd = function(index){
        var puzzle = this.learningPuzzles[index];
        if(puzzle.isTimeToLearn()){
            this.puzzleQueue.push(puzzle);
            this.learningPuzzles.splice(index, 1);
            this.learningPuzzles.push(puzzle);
        }
    };
    this.addRandomFromLearning = function(number){
        // -1 in order do not consider the latest one
        var toAdd = Math.min(number, this.learningPuzzles.length-1);
        while(toAdd>0){
            var indexToAdd = Math.floor(Math.random()*toAdd);
            var puzzle = this.learningPuzzles[indexToAdd];
            if(!puzzle.isLearnt()){
                this.addToQueueAndMoveToEnd(indexToAdd);
            };
            toAdd--;
        };
    };
    this.addNew = function(){
        var positionContainer = this.positionBase;
        if(!positionContainer.beginning){
            var beginning = "";
            for(var j=0;j<positionContainer.length;j++){
                positionContainer[j].beginning = "";
                positionContainer[j].type = 'b';
            };
            positionContainer[0].type = 'main';
        };
        var newPuzzle = this.findNewPuzzleFromPositions(positionContainer);
        this.learningPuzzles.push(newPuzzle);
    };
    this.findNewPuzzleFromPositions = function(positionContainer){
        var queueForDeepening = [];
        var maxVariation = positionContainer.length;
        if(LearningStrategy.QUICK_MODE)
            maxVariation = Math.min(2, maxVariation);
        for(var i=0;i<maxVariation;i++){
            var positionObject = positionContainer[i];
            if(!this.positionObjectValidator.isValid(positionObject))
                continue;
            if(this.isKnown(positionObject)){
                var beginning = this.createPosition(positionObject);
                for(var j=0;j<positionObject.s.length;j++){
                    positionObject.s[j].beginning = beginning;
                    if(positionObject.type == 'main' && j!=0) {
                        positionObject.s[j].type = positionObject.c;
                    } else {
                        positionObject.s[j].type = positionObject.type;
                    }
                }
                if(positionObject.type!='main' && positionObject.type!=positionObject.c){
                    queueForDeepening.push(positionObject.s[0]);
                } else {
                    queueForDeepening = queueForDeepening.concat(positionObject.s);
                };
                continue;
            };
            // type should match the answer, not position
            if(positionObject.type != positionObject.c){
                var newPuzzle = this.createPuzzle(positionObject);
                return newPuzzle;
            };
        };
        return this.findNewPuzzleFromPositions(queueForDeepening);
    };
    this.isKnown = function(positionObject){
        var position = this.createPosition(positionObject);
        for(var i=0;i<this.learningPuzzles.length;i++){
            if(this.learningPuzzles[i].position == position)
                return true;
        }
        return false;
    };
    this.createPuzzle = function(positionObject){
        var position = this.createPosition(positionObject);
        var bestMove = positionObject.s[0].m;
        var puzzle = new Puzzle(position, bestMove);
        return puzzle;
    };
    this.createPosition = function(positionObject){
        var position = positionObject.beginning;
        // add separator if it's not the very first move in position
        if(!((positionObject.n == 1)&&(positionObject.c=='w')))
            position += " ";
        // adding number with point if it's white
        if(positionObject.c=='w')
            position += positionObject.n + ".";
        position += positionObject.m;
        return position;
    };

};

LearningStrategy.QUICK_MODE = false;