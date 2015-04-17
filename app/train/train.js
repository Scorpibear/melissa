'use strict';

angular.module('melissa.train', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/train', {
            templateUrl: '/train.html',
            controller: 'TrainCtrl'
        });
    }])

    .controller('TrainCtrl', [function () {

    }]);