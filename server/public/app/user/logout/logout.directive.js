;(function() {
    'use strict';

    angular
        .module('logout')
        .directive('logout', logout);

    function logout() {

        var directiveDefinitionObject = {
            restrict: 'EA',
            templateUrl: 'app/user/logout/logout.html'
        };

        return directiveDefinitionObject;
    }

})();