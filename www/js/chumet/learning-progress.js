// load/save and contain learning progress
function LearningProgress(){
    this.puzzles = [new Puzzle('', 'd4')];

    if(typeof(Storage) !== "undefined") {
        if(localStorage.chumetPuzzles) {
            try{
                var saved = JSON.parse(localStorage.getItem('chumetPuzzles'));
                var loadedPuzzles = [];
                for(var i=0;i<saved.length;i++){
                    loadedPuzzles.push(Puzzle.createFromJSON(saved[i]));
                }
                if(loadedPuzzles.length>0) {
                    this.puzzles = loadedPuzzles;
                }
            } catch (ex) {
            };
        }
    };

    // save learning progress
    this.save = function(){
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem('chumetPuzzles', JSON.stringify(this.puzzles));
        };
    }

}