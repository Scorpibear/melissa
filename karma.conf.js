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
            'www/js/messages/*.js',
            'www/js/services/services.js',
            'www/js/services/connectors/*',
            'www/js/services/learning-progress/*',
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
            'www/js/train/highlighter.js',
            'www/js/train/*.js',
            'www/js/best-games/best-games.js',
            'www/js/best-games/*.js',
            'www/js/watch-games/watch-games.js',
            'www/js/watch-games/*.js',
            'www/js/reset-progress/*.js',
            'www/js/achievements/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
		},

        // Code coverage report
        reporters: ['progress', 'coverage'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'www/js/achievements/!(*_test).js': ['coverage'],
            'www/js/analyze/!(*_test).js': ['coverage'],
            'www/js/footer/!(*_test).js': ['coverage'],
            'www/js/messages/!(*_test).js': ['coverage'],
            'www/js/services/!(*_test).js': ['coverage'],
            'www/js/services/**/!(*_test).js': ['coverage'],
            'www/js/train/!(*_test).js': ['coverage'],
            'www/js/train-mode-selection/!(*_test).js': ['coverage'],
            'www/js/watch-games/!(*_test).js': ['coverage'],
            'www/js/best-games/!(*_test).js': ['coverage']
        },
        coverageReporter: {
            reporters: [
                { type:'html', dir:'coverage' },
                // generates ./coverage/lcov.info
                { type:'lcovonly', subdir: '.'},
                // generates ./coverage/coverage-final.json
                { type:'json', subdir: '.'}
            ]
        },
        concurrency: 1

    });
};
