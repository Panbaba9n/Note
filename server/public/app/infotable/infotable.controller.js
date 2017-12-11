;(function() {

    angular
    .module('infotable')
    .controller('InfotableController', infotableController);

    infotableController.$inject = ['$scope', 'DataInfotable', 'User'];


    function infotableController($scope, DataInfotable, User) {

        // 'controller as' syntax
        var vm = this;

        vm.notes = getNotes();

        console.log(vm.notes);

        /* /////////////////////// */

        function getNotes() {
        	return DataInfotable.getNotebooks({}, {"token": User.getToken()});
        }
    };

})();