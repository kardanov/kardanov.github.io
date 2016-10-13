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
            width: '=',
            isVisible: '=',
            flag: '=',
            country: '=',
            city: '=',
            closeFn: '&'
        },
        template: "<div id=\"map-popup\" data-ng-show=\"isVisible\" layout=\"row\" layout-align=\"space-between center\">"
                    + "<div class=\"map-popup-control\" data-ng-show=\"width >= 800\"></div>"
                    + "<div class=\"map-popup-content\" data-ng-show=\"width >= 800\" layout=\"row\" layout-align=\"center center\" flex>"
                        + "<div class=\"map-popup-content-inner\" layout=\"column\" layout-align=\"center end\">"
                            + "<img data-ng-src=\"{{flag}}\"/>"
                        + "</div>"
                        + "<div class=\"map-popup-content-inner\" layout=\"column\" layout-align=\"center start\">"
                            + "<span class=\"text-ellipsis\" title=\"{{country | translate}}\">{{country | translate}}</span>"
                            + "<span class=\"text-ellipsis\" title=\"{{city | translate}}\">{{city | translate}}</span>"
                        + "</div>"
                    + "</div>"
                    + "<div data-ng-show=\"width < 800\" layout=\"row\" layout-align=\"center center\" flex>"
                        + "<div class=\"map-popup-content-small-inner-l\" layout=\"column\" layout-align=\"center center\">"
                            + "<img data-ng-src=\"{{flag}}\"/>"
                        + "</div>"
                        + "<div class=\"map-popup-content-small-inner-r\" layout=\"column\" layout-align=\"center start\" flex>"
                            + "<span class=\"text-ellipsis\" title=\"{{country | translate}}\">{{country | translate}}</span>"
                            + "<span class=\"text-ellipsis\" title=\"{{city | translate}}\">{{city | translate}}</span>"
                        + "</div>"
                    + "</div>"
                    + "<div class=\"map-popup-control\" layout=\"row\" layout-align=\"end center\">"
                        + "<md-button class=\"md-icon-button good-nav-button\" data-ng-click=\"closeFn()\" layout=\"column\" layout-align=\"center center\" aria-label=\"close-popup-button\">"
                            + "<span class=\"icon-cross\"></span>"
                        + "</md-button>"
                    + "</div>"
                + "</div>",
        replace: true,
        link: function(scope) {}
    };
});