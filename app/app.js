'use strict';

// Declare app level module which depends on views, and components
angular.module('melissa', [
    'melissa.messages',
    'ngRoute',
    'melissa.train',
    'melissa.achievements',
    'melissa.stats'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/train'});
    }])
;
