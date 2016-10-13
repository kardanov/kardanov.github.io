/**
 * Data factory.
 * Created by Ruslan Kardanov.
 * Date: 12/08/16.
 */
dataFactory = function($rootScope, $http) {

    // Factory.
    var factory = {};

    // Method to do places from the JSON file.
    factory.getPlaces = function() {
        var deferred = $rootScope.loadingTracker.createPromise();
        $http({
            method: 'GET',
            url: 'src/data/places.json'
        }).then(function success(response) {
            deferred.resolve(response.data);
        }, function fail() {
            deferred.resolve([]);
        });
        return deferred.promise;
    }

    // Returns factory.
    return factory;
}

function getVisibleMarkers(markers, year) {
    var result = [];
    if (typeof markers !== 'undefined' && markers.length > 0) {
        markers.forEach(function (marker) {
            if (marker.props.y <= year) {
                result.push(marker);
            }
        });
    }
    return result;
}