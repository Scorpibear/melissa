exports.config = {
    allScriptsTimeout: 11000,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        '*.js'
    ],
    rootElement: '[ng-app]',
    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://127.0.0.1:8000/www/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
