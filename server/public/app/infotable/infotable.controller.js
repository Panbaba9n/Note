;(function() {

    angular
    .module('infotable')
    .controller('InfotableController', infotableController);

    infotableController.$inject = ['$scope', 'DataInfotable', 'User'];


    function infotableController($scope, DataInfotable, User) {

        // 'controller as' syntax
        var vm = this;

        vm.logout = logout;


        // vm.logout();

        /* /////////////////////// */

        function logout() {
        	return User.logout();
        }

    };

})();