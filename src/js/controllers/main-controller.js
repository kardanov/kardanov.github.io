/**
 * Main controller.
 *
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
mainController = function($scope, $rootScope, $location) {

    // App navigation. >>
    // Goes to the location with path specified.
    $rootScope.goTo = function(path) {
        if (!$rootScope.ifHere(path)) {
            $location.path(path);
        }
    }
    // Checks if user is in the location with path specified.
    $rootScope.ifHere = function(path) {
        return $location.path() === path;
    }
    // <<
}