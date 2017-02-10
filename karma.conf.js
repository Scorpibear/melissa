module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'www/js/bower_components/angular/angular.js',
            'www/js/bower_components/angular-loader/angular-loader.js',
            'www/js/bower_components/angular-route/angular-route.js',
            'www/js/bower_components/angular-mocks/angular-mocks.js',
            'www/js/bower_components/chess.js/index.js',
            'www/js/bower_components/chessboardjs/js/chessboard-0.3.0.js',
            'www/js/bower_components/jquery/dist/jquery.js',
            'www/js/messages/messages.js',
            'www/js/services/base.js',
            'www/js/services/services.js',
            'www/js/services/teacher/*.js',
            'www/js/services/train_strategies/game-creator.js',
            'www/js/services/train_strategies/*.js',
            'www/js/services/train-mode.js',
            'www/js/services/*.js',
            'www/js/train-mode-selection/train-mode-selection.js',
            'www/js/train-mode-selection/*',
            'www/js/analyze/analyze.js',
            'www/js/analyze/*.js',
            'www/js/train/train.js',
            'www/js/train/*.js',
            'www/js/achievements/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
