﻿(function () {
    'use strict';

    var projectDescriptionDirective = function projectDescriptionDirective() {
        return {
            restrict: 'A',
            templateUrl: '/app/project-details-page/project-description-directive.html',
            scope: {
                description: '='
            },
            link: function (scope, element) {
                scope.descriptionParts = scope.description.split('\r\n').filter(function (e) { return e === 0 || e });
            }
        };
    };

    angular
        .module('showcaseSystem.directives')
        .directive('projectDescription', [projectDescriptionDirective]);
}());