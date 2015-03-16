// generate puzzles from base
function PuzzleGenerator(baseObject, puzzles) {
    'use strict';
    this.learningPuzzles = puzzles;
    this.positionObjectValidator = new PositionObjectValidator();
    this.positionsQueue = baseObject;

    this.generate = function() {
        this.prepareQueue();
        var puzzleOrQueue = this.findNewPuzzleFromPositions(this.positionsQueue);
        while(!(puzzleOrQueue instanceof Puzzle)) {
            if(puzzleOrQueue.length>0) {
                this.positionsQueue = puzzleOrQueue;
                puzzleOrQueue = this.findNewPuzzleFromPositions(this.positionsQueue);
            } else {
                return null;
            }
        }
        debugger;
        var newPuzzle = puzzleOrQueue;
        return newPuzzle;
    };

    this.prepareQueue = function() {
        if(!this.positionsQueue[0].beginning) {
            var beginning = "";
            for(var j=0;j<this.positionsQueue.length;j++) {
                this.positionsQueue[j].beginning = "";
                this.positionsQueue[j].type = 'b';
            };
            this.positionsQueue[0].type = 'main';
        };
    };
    // return either puzzle or queue of positions for further search
    this.findNewPuzzleFromPositions = function(positionContainer) {
        var queueForDeepening = [];
        var maxVariation = positionContainer.length;
        if(LearningStrategy.QUICK_MODE)
            maxVariation = Math.min(2, maxVariation);
        for(var i=0;i<maxVariation;i++) {
            var positionObject = positionContainer[i];
            if(!(this.positionObjectValidator.isValid(positionObject)))
                continue;
            if(this.isKnown(positionObject)) {
                queueForDeepening = this.extendPositionQueue(queueForDeepening, positionObject);
            } else {
                // type should match the answer, not position
                if(positionObject.type != positionObject.c) {
                    debugger;
                    var newPuzzle = this.createPuzzle(positionObject);
                    return newPuzzle;
                } else {
                    queueForDeepening = this.extendPositionQueue(queueForDeepening, positionObject);
                };
            }
        };
        return queueForDeepening;
    };

    this.prepareSubNodes = function(positionObject) {
        var beginning = this.createPosition(positionObject);
        for(var j=0;j<positionObject.s.length;j++) {
            positionObject.s[j].beginning = beginning;
            if(positionObject.type == 'main' && j!=0) {
                positionObject.s[j].type = positionObject.c;
            } else {
                positionObject.s[j].type = positionObject.type;
            }
        }
    };

    this.extendPositionQueue = function(positionQueue, positionObject) {
        this.prepareSubNodes(positionObject);
        if(positionObject.type!='main' && positionObject.type!=positionObject.c) {
            positionQueue.push(positionObject.s[0]);
        } else {
            positionQueue = positionQueue.concat(positionObject.s);
        };
        return positionQueue;
    };

    this.isKnown = function(positionObject) {
        var position = this.createPosition(positionObject);
        for(var i=0;i<this.learningPuzzles.length;i++) {
            if(this.learningPuzzles[i].position == position)
                return true;
        }
        return false;
    };
    this.createPuzzle = function(positionObject) {
        var position = this.createPosition(positionObject);
        var bestMove = positionObject.s[0].m;
        var puzzle = new Puzzle(position, bestMove);
        return puzzle;
    };
    this.createPosition = function(positionObject) {
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