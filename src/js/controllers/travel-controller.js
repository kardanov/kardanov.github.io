/**
 * Travel controller.
 *
 * Created by Ruslan Kardanov.
 * Date: 27/05/16.
 */
travelController = function($scope, $window, $http, $mdSidenav, $timeout, dataFactory) {

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
    $scope.tech.popupName = '';
    $scope.tech.popupCountry = '';
    $scope.tech.popupFlag = '';
    $scope.tech.currentYear = 2016;
    $scope.tech.allMarkers = [];

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
            $scope.tech.allMarkers = result;
            $scope.tech.allMarkers.forEach(function (marker) {
                marker.icon = icon;
            });

            angular.extend($scope, {
                markers: getVisibleMarkers($scope.tech.allMarkers, $scope.tech.currentYear)
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

    $scope.$on('leafletDirectiveMarker.click', function(e, args) {

        // Setting new values.
        $timeout(function () {
            $scope.tech.popupFlag = 'src/images/flags/' + args.model.props.c + '.png';
            $scope.tech.popupName = args.model.props.n;
            $scope.tech.popupCountry = args.model.props.c;
        });

        if (!$scope.tech.showPopup) {
            $timeout(function () {
                $scope.tech.showPopup = true;
            });
        }

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

        $scope.tech.popupName = '';
        $scope.tech.popupCountry = '';
        $scope.tech.popupFlag = '';

        if ($scope.center.zoom > 6) {
            $scope.center.zoom = 6;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.toggleSideNav = function () {
        $scope.closePopup();
        $mdSidenav('left').toggle();
    }

    $scope.onYearChange = function() {
        $scope.closePopup();
        angular.extend($scope, {
            markers: getVisibleMarkers($scope.tech.allMarkers, $scope.tech.currentYear)
        });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    // Gets map height depending on the window height.
    function getMapHeight(windowHeight) {
        return windowHeight - angular.element(document.querySelector('#header-container'))[0].offsetHeight - 41;
    }
}