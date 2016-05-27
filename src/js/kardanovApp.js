'use strict';

// Configuring app.
var kardanovApp = angular.module('myApp', [
    'ngRoute',
    'myApp.version',
    'ngMaterial'
]);

// Setting main controller.
kardanovApp.controller('MainController', mainController);

// Configuring routing.
kardanovApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home' , {templateUrl: 'src/views/home.html',  controller: homeController})
        .when('/work' , {templateUrl: 'src/views/work.html',  controller: workController})
        .when('/travel' , {templateUrl: 'src/views/travel.html',  controller: travelController})
            .otherwise({redirectTo: '/home'});
}]);

// Setting color theme.
kardanovApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('grey', {'default':'900'})
        .accentPalette('blue-grey', {'default':'300'})
        .warnPalette('red', {'default':'700'});
});