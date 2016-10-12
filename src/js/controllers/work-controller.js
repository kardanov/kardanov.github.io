/**
 * Work controller.
 *
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
workController = function($scope) {

    $scope.slideTo = function(anchor) {
        $('#main-app-content').animate({ scrollTop: $(anchor).position().top + $('#main-app-content')[0].scrollTop }, 'slow');
    }
}