/**
 * Travel controller.
 *
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
travelController = function($scope, $window, $http, leafletMarkerEvents) {

    // Getting map height.
    $scope.mapHeight = getMapHeight($window.innerHeight);
    angular.element($window).bind('resize', function () {
        $scope.mapHeight = getMapHeight($window.innerHeight);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.tech = {};
    $scope.tech.showPopup = false;
    $scope.tech.popupContent = 'n/a';

    // Setting up custom map marker icon.
    var icon = {
        iconUrl: 'src/images/map-marker.png',
        iconSize: [24, 24]
    };

    // Map defaults.
    $scope.defaults = {
        zoomControl: false,
        scrollWheelZoom: true,
        minZoom: 5
    }
    // Center of the map.
    $scope.center = {
        lat: 48.401082,
        lng: 9.987608,
        zoom: 6
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
                    showCoverageOnHover: false,
                    maxClusterRadius: 60
                },
                layerParams: {
                    showOnSelector: false
                }
            }
        }
    }

    // Map events.
    $scope.events = {
        markers: {
            enable: ['touchend', 'click']
        }
    };

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

    // Getting countries to be shown on the map.
    /*
    $http({
        method: 'GET',
        url: 'src/data/countries.json'
    }).then(function (result) {
        angular.extend($scope, {
            geojson: {
                data: result.data,
                style: {
                    fillColor: '#212121',
                    weight: 1,
                    opacity: 1,
                    color: 'white',
                    dashArray: '1',
                    fillOpacity: 0.3
                }
            }
        });
    })*/

    $scope.$on('leafletDirectiveMarker.click', function(e, args) {
        $scope.tech.popupContent = args.model.properties.name + ' [ ' + args.model.properties.c + ' ]';
        $scope.tech.showPopup = true;

        // Repositioning center of the map.
        $scope.center.lat = args.model.lat;
        $scope.center.lng = args.model.lng;
        // Changing zoom (if required).
        if ($scope.center.zoom < 10) {
            $scope.center.zoom = 10;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.$on('leafletDirectiveMarker.touchend', function(e, args) {
        $scope.tech.popupContent = args.model.properties.name + ' [ ' + args.model.properties.c + ' ]';
        $scope.tech.showPopup = true;

        // Repositioning center of the map.
        $scope.center.lat = args.model.lat;
        $scope.center.lng = args.model.lng;
        // Changing zoom (if required).
        if ($scope.center.zoom < 10) {
            $scope.center.zoom = 10;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.closePopup = function() {
        $scope.tech.showPopup = false;

        // Changing zoom (if required).
        if ($scope.center.zoom > 6) {
            $scope.center.zoom = 6;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    // Gets map height depending on the window height.
    function getMapHeight(windowHeight) {
        return windowHeight - angular.element(document.querySelector('#header-container'))[0].offsetHeight - 41;
    }
}