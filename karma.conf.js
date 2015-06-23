module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-loader/angular-loader.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/chessboardjs/js/chess.js',
            'app/bower_components/chessboardjs/js/chessboard.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/services/base.js',
            'app/services/services.js',
            'app/services/*.js',
            'app/services/**/*.js',
            'app/analyze/**/*.js',
            'app/train/train.js',
            'app/train/**/*.js',
            'app/achievements/**/*.js'
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
