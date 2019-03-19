angular.module("melissa.messages", [])
    .factory("messages", ["language", function (language) {
        var base = {en:{}, ru:{}};
        base.en = {
            correctAnswers: ["Yes!", "Great!", "Perfect!", "Right!", "Excellent!", "You are right!", "Correct!",
                "Brilliant!", "Godlike!", "Good!", "Very good!", "Superb!", "Outstanding!", "Marvelous!",
                "Magnificent!", "Well done!", "Very well!"],
            "Good job, no more puzzles, have a rest!": "Good job, no more puzzles, have a rest!",
            "What is the best move?": "What is the best move?",
            "Position": "Position",
            "Train": "Train",
            "Achievements": "Stats",
            "Analyze": "Analyze",
            "Positions learnt": "Positions learnt",
            "Train branch": "Train branch",
            "Reset progress": "Reset progress",
            "Level": "Level",
            "Positions left for the next level": "Positions left for the next level",
            "Choose the way how to train your memory and chess intuition": "Choose the way how to train your memory and chess intuition",
            "Best Moves": "Best Moves",
            "Best Games": "Best Games",
            "Watch & Remember": "Watch & Remember",
            "Training progress (learnt / total):": "Progress (learnt / total):",
            "Do you really want to reset all progress you have made and start from the very beginning?": "Do you really want to reset all progress you have made and start from the very beginning?",
            "YES": "YES",
            "NO": "NO",
            "Type CONFIRM if you really want to reset all your achievements": "Type CONFIRM if you really want to reset all your achievements",
            "CONFIRM": "CONFIRM",
            "OK": "OK",
            "CANCEL": "CANCEL",
            "Give me more!": "Give me more!"
        };
        base.ru = {
            correctAnswers: ["Верно!", "Правильно!", "Точно!", "Да!", "Да, это самый лучший ход в этой позиции!",
                "Верно, это самый лучший ход в этой позиции!", "Отлично!", "Супер!", "Так точно!", "Именно!",
                "Именно так!", "Превосходно!", "Божественно!"],
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
            "Positions left for the next level": "Осталось изучить до следующего уровня",
            "Choose the way how to train your memory and chess intuition": "Выберите способ тренировки своей памяти и шахматной интуиции",
            "Best Moves": "Лучшие ходы",
            "Best Games": "Лучшие партии",
            "Watch & Remember": "Смотри и запоминай",
            "Training progress (learnt / total):": "Прогресс тренировки (изучено / всего):",
            "Do you really want to reset all progress you have made and start from the very beginning?": "Вы действительно хотите сбросить все свои достижения и начать с самого начала?",
            "YES": "ДА",
            "NO": "НЕТ",
            "Type CONFIRM if you really want to reset all your achievements": "Напишите ПОДТВЕРДИТЬ если вы действительно хотите сбросить все свои достижения",
            "CONFIRM": "ПОДТВЕРДИТЬ",
            "ОK": "OK",
            "CANCEL": "ОТМЕНА",
            "Give me more!": "Ещё!"
        };
        var availableTranslations = [];
        for(key in base) {availableTranslations.push(key)};
        var getBase = function () {
            var out = base[language.getCode(availableTranslations)];
            if(out == undefined) {
                out = base[availableTranslations[0]];
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
    }])
    .filter("localize", function (messages) {
        return function (input) {
            input = input || '';
            return messages.get(input);
        };
    });
