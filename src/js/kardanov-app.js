'use strict';

// Configuring app.
var kardanovApp = angular.module('myApp', [
    'ngRoute',
    'ngTouch',
    'myApp.version',
    'ngMaterial',
    'leaflet-directive'
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

    $mdThemingProvider.definePalette('white', {
        '50': 'ffffff',
        '100': 'ffffff',
        '200': 'ffffff',
        '300': 'ffffff',
        '400': 'ffffff',
        '500': 'ffffff',
        '600': 'ffffff',
        '700': 'ffffff',
        '800': 'ffffff',
        '900': 'ffffff',
        'A100': 'ffffff',
        'A200': 'ffffff',
        'A400': 'ffffff',
        'A700': 'ffffff',
        'contrastDefaultColor': 'dark'
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('grey', {'default':'900'})
        .accentPalette('blue-grey', {'default':'300'})
        .warnPalette('white', {'default':'50'});
});

// Disabling debug logging.
kardanovApp.config(function($logProvider){
    $logProvider.debugEnabled(false);
});