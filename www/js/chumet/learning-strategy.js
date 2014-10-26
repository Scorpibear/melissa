// know what to learn next
function LearningStrategy(){
    this.puzzleQueue = [];
    this.learningPuzzles = [new Puzzle('', 'd4')];
    this.positionBase = base;
    this.positionObjectValidator = new PositionObjectValidator();
    this.getNextPuzzle = function(){
        this.refillQueue();
        var puzzle = this.puzzleQueue.shift();
        return puzzle;
        //return this.getNextRandomPosition();
    };
    //obsolete, to remove
    this.getNextRandomPosition = function(){
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

            // if main line become not main, time to specify position - white or black
            if((positionType=="wb")&&(posIndex!=0))
                positionType=positionObject.s[0].c;

            // going deeper to change container
            baseContainer = positionObject.s;
            depth--;
            // if depth ended but position type does not meet position object, increase the depth.
            if((depth==-1)&&(positionType.search(positionObject.s[0].c)==-1))
                depth++;
        };
        return {position: position, bestMove: bestMove};
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
        this.puzzleQueue.push(puzzle);
        this.learningPuzzles.splice(index, 1);
        this.learningPuzzles.push(puzzle);
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
            };
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
                }
                queueForDeepening = queueForDeepening.concat(positionObject.s);
                continue;
            };
            var newPuzzle = this.createPuzzle(positionObject);
            return newPuzzle;
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

LearningStrategy.QUICK_MODE = true;