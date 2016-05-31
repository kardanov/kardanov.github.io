/**
 * Travel controller.
 *
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
travelController = function($scope, $window, $http) {

    // Getting map height.
    $scope.mapHeight = getMapHeight($window.innerHeight);
    angular.element($window).bind('resize', function () {
        $scope.mapHeight = getMapHeight($window.innerHeight);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    // Setting up custom map marker icon.
    var icon = {
        iconUrl: 'src/images/map-marker.png',
        iconSize: [48, 48]
    };

    // Map defaults.
    $scope.defaults = {
        zoomControl: false,
        scrollWheelZoom: true,
        minZoom: 4,
        center: {
            lat: 48.401082,
            lng: 9.987608,
            zoom: 5
        }
    }
    // Map layers.
    $scope.layers = {
        baselayers: {
            watercolor: {
                name: 'watercolor',
                type: 'xyz',
                url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
                layerOptions: {
                    attribution: '<a href="http://stamen.com">Stamen Design</a>, ' + '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | ' + '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    showOnSelector: false
                }
            }
        },
        overlays: {
            travel: {
                name: 'travel',
                type: 'markercluster',
                visible: true,
                layerOptions: {
                    showCoverageOnHover: false
                },
                layerParams: {
                    showOnSelector: false
                }
            }
        }
    }

    // Getting places to be shown on the map.
    $http({
        method: 'GET',
        url: 'src/data/places.json'
    }).then(function (result) {
        // Getting markers.
        $scope.markers = result.data;
        if (typeof $scope.markers !== 'undefined' && $scope.markers.length > 0) {
            $scope.markers.forEach(function (marker) {
                marker.icon = icon;
            });
        }
    })

    // Gets map height depending on the window height.
    function getMapHeight(windowHeight) {
        return windowHeight
            - angular.element(document.querySelector('#header-container'))[0].offsetHeight
            - angular.element(document.querySelector('#footer-container'))[0].offsetHeight
                - 1;
    }
}