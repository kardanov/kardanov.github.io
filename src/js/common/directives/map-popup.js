/**
 * Map pop-up directive.
 * Created by Ruslan Kardanov.
 * Date: 13/10/16.
 */
'use strict';
angular.module('mapPopup', []).directive('mapPopup', function () {
    return {
        restrict: 'E',
        scope: {
            isVisible: '=',
            flag: '=',
            country: '=',
            city: '=',
            closeFn: '&'
        },
        template: "<div id=\"map-popup\" data-ng-show=\"isVisible\" layout=\"row\" layout-align=\"space-between center\">"
                    + "<div class=\"map-popup-control\" hide-xs></div>"
                    + "<div class=\"map-popup-content\" layout=\"row\" layout-align=\"center center\" flex>"
                        + "<div class=\"map-popup-content-inner\" layout=\"column\" layout-align=\"center end\">"
                            + "<img data-ng-src=\"{{flag}}\"/>"
                        + "</div>"
                        + "<div class=\"map-popup-content-inner\" layout=\"column\" layout-align=\"center start\">"
                            + "<span class=\"text-ellipsis\" title=\"{{country | translate}}\">{{country | translate}}</span>"
                            + "<span class=\"text-ellipsis\" title=\"{{city | translate}}\">{{city | translate}}</span>"
                        + "</div>"
                    + "</div>"
                    + "<div class=\"map-popup-control\" layout=\"row\" layout-align=\"end center\">"
                        + "<md-button class=\"md-icon-button good-popup-button\" data-ng-click=\"closeFn()\" layout=\"column\" layout-align=\"center center\" aria-label=\"close-popup-button\">"
                            + "<span class=\"icon-cross\"></span>"
                        + "</md-button>"
                    + "</div>"
                + "</div>",
        replace: true,
        link: function(scope) {}
    };
});