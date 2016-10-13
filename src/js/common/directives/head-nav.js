/**
 * Header navigation directive.
 * Created by Ruslan Kardanov.
 * Date: 13/10/16.
 */
'use strict';
angular.module('headNav', []).directive('headNav', function () {
    return {
        restrict: 'E',
        scope: {
            width: '=',
            goToFn: '&',
            ifHereFn: '&'
        },
        template: "<div layout=\"row\" layout-align=\"end center\">"
                    + "<div data-ng-show=\"width >= 800\">"
                        + "<md-button class=\"nav-button\" data-ng-disabled=\"ifHereFn({loc : '/work'})\" data-ng-click=\"goToFn({loc : '/work'})\" aria-label=\"go-work-button\">"
                            + "{{'WORK' | translate}}"
                        + "</md-button>"
                        + "<md-button class=\"nav-button\" data-ng-disabled=\"ifHereFn({loc : '/travel'})\" data-ng-click=\"goToFn({loc : '/travel'})\" aria-label=\"go-travel-button\">"
                            + "{{'TRAVEL' | translate}}"
                        + "</md-button>"
                    + "</div>"
                    + "<div data-ng-show=\"width < 800\">"
                        + "<md-menu>"
                            + "<md-button class=\"md-icon-button good-nav-button\" data-ng-click=\"$mdOpenMenu($event)\" layout=\"column\" layout-align=\"center center\" aria-label=\"open-menu-button\">"
                                + "<span class=\"icon-menu\"></span>"
                            + "</md-button>"
                            + "<md-menu-content width=\"2\">"
                                + "<md-menu-item>"
                                    + "<md-button class=\"menu-nav-button\" data-ng-disabled=\"ifHereFn({loc : '/work'})\" data-ng-click=\"goToFn({loc : '/work'})\" aria-label=\"go-work-button\">"
                                        + "{{'WORK' | translate}}"
                                    + "</md-button>"
                                + "</md-menu-item>"
                                + "<md-menu-item>"
                                    + "<md-button class=\"menu-nav-button\" data-ng-disabled=\"ifHereFn({loc : '/travel'})\" data-ng-click=\"goToFn({loc : '/travel'})\" aria-label=\"go-travel-button\">"
                                        + "{{'TRAVEL' | translate}}"
                                    + "</md-button>"
                                + "</md-menu-item>"
                            + "</md-menu-content>"
                        + "</md-menu>"
                    + "</div>"
                + "</div>",
        replace: true,
        link: function(scope) {}
    };
});