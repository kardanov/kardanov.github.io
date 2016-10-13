/**
 * Work navigation directive.
 * Created by Ruslan Kardanov.
 * Date: 13/10/16.
 */
'use strict';
angular.module('workNav', []).directive('workNav', function () {
    return {
        restrict: 'E',
        scope: {
            activeItem: '@',
            onClickFn: '&'
        },
        template: "<div layout=\"row\" layout-align=\"center center\">"
                    + "<md-button class=\"md-icon-button good-work-button\" data-ng-disabled=\"activeItem === 'w_1'\" data-ng-click=\"onClickFn({anchor: '#w_1'})\" layout=\"column\" layout-align=\"center center\" aria-label=\"work-nav-button\">"
                        + "<span>0</span>"
                        + "<span class=\"work-text\">{{'MIN' | translate}}</span>"
                    + "</md-button>"
                    + "<md-button class=\"md-icon-button good-work-button\" data-ng-disabled=\"activeItem === 'w_2'\" data-ng-click=\"onClickFn({anchor: '#w_2'})\" layout=\"column\" layout-align=\"center center\" aria-label=\"work-nav-button\">"
                        + "<span>1</span>"
                        + "<span class=\"work-text\">{{'MIN' | translate}}</span>"
                    + "</md-button>"
                    + "<md-button class=\"md-icon-button good-work-button\" data-ng-disabled=\"activeItem === 'w_3'\" data-ng-click=\"onClickFn({anchor: '#w_3'})\" layout=\"column\" layout-align=\"center center\" aria-label=\"work-nav-button\">"
                        + "<span>3</span>"
                        + "<span class=\"work-text\">{{'MIN' | translate}}</span>"
                    + "</md-button>"
                    + "<md-button class=\"md-icon-button good-work-button\" data-ng-disabled=\"activeItem === 'w_4'\" data-ng-click=\"onClickFn({anchor: '#w_4'})\" layout=\"column\" layout-align=\"center center\" aria-label=\"work-nav-button\">"
                        + "<span>5</span>"
                        + "<span class=\"work-text\">{{'MIN' | translate}}</span>"
                    + "</md-button>"
                + "</div>",
        replace: true,
        link: function(scope) {}
    };
});