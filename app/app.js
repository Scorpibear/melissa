'use strict';

// Declare app level module which depends on views, and components
angular.module('melissa', [
    'ngRoute',
    'melissa.train',
    'melissa.achievements',
    'melissa.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/train'});
    }]);
