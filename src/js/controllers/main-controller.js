/**
 * Main controller.
 *
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
mainController = function($scope, $rootScope, $location, $window, $translate, titleFactory, promiseTracker) {

    // Handling app width.
    $rootScope.width = $window.innerWidth;
    angular.element($window).bind('resize', function () {
        $rootScope.width = $window.innerWidth;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    // Creating new loading tracker.
    $rootScope.loadingTracker = promiseTracker('loadingTracker');

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

    // Handling language preferences.
    $scope.getCurrentLanguage = function() {
        return $translate.use() === 'ru_RU' ? 'RU' : 'EN';
    }
    $scope.setLanguage = function(lang) {
        titleFactory.setTitleStart(lang === 'RU' ? 'К А Р Д А Н О В .' : 'K A R D A N O V .');
        $translate.use(lang === 'RU' ? 'ru_RU' : 'en_US');
        $rootScope.$emit('languageChangeEvent');
    }
}