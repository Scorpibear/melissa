'use strict';

// Declare app level module which depends on views, and components
angular.module('melissa', [
    'ngRoute',
    'melissa.messages',
    'melissa.trainModeSelection',
    'melissa.train',
    'melissa.watchGames',
    'melissa.analyze',
    'melissa.achievements',
    'melissa.footer'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/js/train-mode-selection'});
    }])
;
