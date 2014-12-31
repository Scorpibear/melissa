// generate puzzles from base
function PuzzleGenerator(baseObject, puzzles){
    this.base = baseObject;
    this.learningPuzzles = puzzles;
    this.positionObjectValidator = new PositionObjectValidator();

    this.generate = function(){
        var positionContainer = this.base;
        if(!positionContainer.beginning){
            var beginning = "";
            for(var j=0;j<positionContainer.length;j++){
                positionContainer[j].beginning = "";
                positionContainer[j].type = 'b';
            };
            positionContainer[0].type = 'main';
        };
        var newPuzzle = this.findNewPuzzleFromPositions(positionContainer);
        while(typeof(newPuzzle) != Puzzle){
            if(newPuzzle.length>0) {
                newPuzzle = this.findNewPuzzleFromPositions(newPuzzle);
            } else {
                newPuzzle = null;
                break;
            }
        }
        return newPuzzle;
    };
    // return either puzzle or queue of positions for further search
    this.findNewPuzzleFromPositions = function(positionContainer){
        var queueForDeepening = [];
        var maxVariation = positionContainer.length;
        if(LearningStrategy.QUICK_MODE)
            maxVariation = Math.min(2, maxVariation);
        for(var i=0;i<maxVariation;i++){
            var positionObject = positionContainer[i];
            if(!(this.positionObjectValidator.isValid(positionObject)))
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
        return queueForDeepening;
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
}