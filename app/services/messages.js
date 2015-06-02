angular.module("melissa.services")
    .factory("messages", function () {
        var correctAnswers = ["Yes!", "Great!", "Perfect!", "Right!", "Excellent!", "You are right!", "Correct!"];
        var noMorePuzzles = "Good job, no more puzzles, have a rest!";
        var question = "What is the best move?";
        var position = "Position";
        return {
            correctAnswer: function () {
                return correctAnswers[Math.round(Math.random() * correctAnswers.length)];
            },
            noMorePuzzles: function () {
                return noMorePuzzles;
            },
            question: function () {
                return question;
            },
            position: function () {
                return position;
            }
        }
    });
