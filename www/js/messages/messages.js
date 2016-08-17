angular.module("melissa.messages", [])
    .constant("defaultLocale", "en")
    .value("locale", "ru")

    .factory("messages", function (locale, defaultLocale) {
        var base = [];
        base["en"] = {
            correctAnswers: ["Yes!", "Great!", "Perfect!", "Right!", "Excellent!", "You are right!", "Correct!",
                "Brilliant!"],
            "Good job, no more puzzles, have a rest!": "Good job, no more puzzles, have a rest!",
            "What is the best move?": "What is the best move?",
            "Position": "Position",
            "Train": "Train",
            "Achievements": "Achievements",
            "Analyze": "Analyze",
            "Positions learnt": "Positions learnt",
            "Train branch": "Train branch",
            "Reset progress": "Reset progress",
            "Level": "Level",
            "Positions left for next level": "Positions left for next level"
        };
        base["ru"] = {
            correctAnswers: ["Верно!", "Правильно!", "Точно!", "Да!", "Да, это самый лучший ход в этой позиции!",
                "Верно, это самый лучший ход в этой позиции!", "Отлично!", "Супер!", "Так точно!", "Именно!",
                "Именно так!", "Превосходно!"],
            "Good job, no more puzzles, have a rest!": "Хорошо потренировались, теперь можно отдохнуть!",
            "What is the best move?": "Какой самый лучший ход в этой позиции? Попробуй угадать и сделай его!",
            "Position": "Позиция",
            "Train": "Тренировка",
            "Achievements": "Достижения",
            "Analyze": "Анализ",
            "Positions learnt": "Изучено позиций",
            "Train branch": "Тренировать ветку",
            "Reset progress": "Сброс",
            "Level": "Уровень",
            "Positions left for next level": "Осталось изучить до следующего уровня"

        };
        var getBase = function () {
            var out = base[locale];
            if (out == undefined) {
                out = base[defaultLocale];
            }
            return out;
        };
        var getMessage = function (key) {
            var base = getBase();
            var out = base[key];
            if (out == undefined) {
                out = key;
            }
            return out;
        };
        return {
            get: function (key) {
                return getMessage(key);
            },
            correctAnswer: function () {
                var correctAnswers = getMessage("correctAnswers");
                return correctAnswers[Math.round(Math.random() * correctAnswers.length)];
            }
        }
    })
    .filter("localize", function (messages) {
        return function (input) {
            input = input || '';
            return messages.get(input);
        };
    });
