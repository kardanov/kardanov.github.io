/**
 * Travel controller.
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
travelController = function($scope, $window, $http, $mdSidenav, $timeout, dataFactory) {

    // Map tech stuff.
    $scope.tech = {};
    $scope.tech.show = false;
    $scope.tech.flag = '';
    $scope.tech.country = '';
    $scope.tech.city = '';
    $scope.tech.year = 2016;
    $scope.tech.all = [];

    // Setting up custom map marker icon.
    var icon = {
        iconUrl: 'src/images/map-marker.png',
        iconSize: [24, 24]
    };

    // Configuring basic map data.
    angular.extend($scope, {
        center: {
            lat: 48.401082,
            lng: 9.987608,
            zoom: 7
        },
        defaults: {
            zoomControl: false,
            minZoom: 5
        },
        layers: {
            baselayers: {
                toner: {
                    name: 'toner',
                    type: 'xyz',
                    url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png',
                    layerOptions: {
                        attribution: '<a href="http://stamen.com">Stamen Design</a>, ' + '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | ' + '<a href="http://www.openstreetmap.org/copyright">OSM</a>',
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
                        maxClusterRadius: 65
                    },
                    layerParams: {
                        showOnSelector: false
                    }
                }
            }
        }
    });

    // Getting places to be shown on the map.
    $timeout(function () {
        dataFactory.getPlaces().then(function (result) {
            $scope.tech.all = result;
            $scope.tech.all.forEach(function (marker) {
                marker.icon = icon;
            });

            angular.extend($scope, {
                markers: getVisibleMarkers($scope.tech.all, $scope.tech.year)
            });
        });
    }, 100);

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

    // Method listening on marker click events.
    $scope.$on('leafletDirectiveMarker.click', function(e, args) {
        $timeout(function () {
            // Setting new values & showing popup.
            $scope.tech.flag = 'src/images/flags/' + args.model.props.c + '.png';
            $scope.tech.country = args.model.props.c;
            $scope.tech.city = args.model.props.n;
            if (!$scope.tech.show) {
                $timeout(function () {
                    $scope.tech.show = true;
                });
            }
        });

        // Repositioning center of the map & updating zoom.
        $scope.center.lat = args.model.lat;
        $scope.center.lng = args.model.lng;
        if ($scope.center.zoom < 10) {
            $scope.center.zoom = 10;
        }
        if (!$scope.$$phase) { $scope.$apply(); }
    });

    // Method to close popup.
    $scope.closePopup = function() {
        $scope.tech.show = false;
        $scope.tech.flag = '';
        $scope.tech.country = '';
        $scope.tech.city = '';
        if ($scope.center.zoom > 6) {
            $scope.center.zoom = 6;
        }
        if (!$scope.$$phase) { $scope.$apply(); }
    }

    // Method to toggle side navigation.
    $scope.toggleSideNav = function () {
        $scope.closePopup();
        $mdSidenav('left').toggle();
    }

    // Method to be run on year change.
    $scope.onYearChange = function() {
        $scope.closePopup();
        angular.extend($scope, {
            markers: getVisibleMarkers($scope.tech.all, $scope.tech.year)
        });
        if (!$scope.$$phase) { $scope.$apply(); }
    }
}