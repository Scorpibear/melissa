function LearningStats(puzzles){
    this.getPositionsLearnt = function(){
        var learnt = 0;
        for(var i=0;i<puzzles.length;i++){
            if(puzzles[i].isLearnt())
                learnt++;
        }
    }
}