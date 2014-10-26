// validate position object to be used for puzzle
function PositionObjectValidator(){
    this.isValid = function(positionObject){
        var valid = (
            // evaluated
            positionObject.e &&
            // has sub nodes
            positionObject.s.length &&
            // best answer is evaluated
            positionObject.s[0].e &&
            // subnode has the same or next number
            [0,1].indexOf(positionObject.s[0].n - positionObject.n)!=-1
            );
        return valid;
    }
}