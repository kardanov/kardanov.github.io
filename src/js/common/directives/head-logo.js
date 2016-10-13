/**
 * Header logo directive.
 * Created by Ruslan Kardanov.
 * Date: 13/10/16.
 */
'use strict';
angular.module('headLogo', []).directive('headLogo', function () {
    return {
        restrict: 'E',
        scope: {
            width: '=',
            goToFn: '&'
        },
        template: "<div layout=\"row\" layout-align=\"start center\">"
                    + "<span class=\"logo clickable\" data-ng-click=\"goToFn({loc : '/home'})\">"
                        + "<span data-ng-show=\"width >= 800\">{{'KARDANOV' | translate}}</span>"
                        + "<span data-ng-show=\"width < 800\">{{'K' | translate}}</span>"
                    +  "</span>"
                + "</div>",
        replace: true,
        link: function(scope) {}
    };
});