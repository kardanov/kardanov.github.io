/**
 * Travel controller.
 *
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
travelController = function($scope, $window) {

    angular.extend($scope, {
        ulm: {
            lat: 48.401082,
            lng: 9.987608,
            zoom: 5
        },
        defaults: {
            tileLayer: "http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
            tileLayerOptions: {
                attribution: '<a href="http://stamen.com">Stamen Design</a>, ' +
                             '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | ' +
                             '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            },
            scrollWheelZoom: false,
            minZoom: 4
        }
    });

    // Getting map height.
    $scope.mapHeight = $window.innerHeight - angular.element(document.querySelector('#header-container'))[0].offsetHeight - 35;
    angular.element($window).bind('resize', function () {
        $scope.mapHeight = $window.innerHeight - angular.element(document.querySelector('#header-container'))[0].offsetHeight - 35;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
}