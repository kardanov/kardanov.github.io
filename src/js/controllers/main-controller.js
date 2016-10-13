/**
 * Main controller.
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
mainController = function($scope, $rootScope, $location, $window, $translate, promiseTracker) {

    // Creating new loading tracker.
    $rootScope.loadingTracker = promiseTracker('loadingTracker');

    // Handling app width&height.
    $rootScope.width = $window.innerWidth;
    $rootScope.height = getMapHeight($window.innerHeight);
    angular.element($window).bind('resize', function () {
        $rootScope.width = $window.innerWidth;
        $rootScope.height = getMapHeight($window.innerHeight);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    // App navigation. >>
    // Going to the location with path specified.
    $rootScope.goTo = function(path) {
        if (!$rootScope.ifHere(path)) {
            $location.path(path);
        }
    }
    // Checking if user is in the location with path specified.
    $rootScope.ifHere = function(path) {
        return $location.path() === path;
    }
    // <<

    // Handling language preferences. >>
    // Getting current language.
    $scope.getCurrentLanguage = function() {
        return $translate.use() === translations_ru_RU.LOCALE ? translations_ru_RU.CODE : translations_en_US.CODE;
    }
    // Setting language.
    $scope.setLanguage = function(lang) {
        $translate.use(lang === translations_ru_RU.CODE ? translations_ru_RU.LOCALE : translations_en_US.LOCALE);
        $rootScope.$emit('languageChangeEvent');
    }
    // <<

    // Gets map height depending on the window height.
    function getMapHeight(windowHeight) {
        return windowHeight - angular.element(document.querySelector('#header-container'))[0].offsetHeight - 41;
    }
}