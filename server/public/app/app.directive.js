;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('todoApp', todoApp);

    function todoApp() {

        var directiveDefinitionObject = {
            restrict: 'E',
            templateUrl: 'app/app.html'
        };

        return directiveDefinitionObject;
    }

})();