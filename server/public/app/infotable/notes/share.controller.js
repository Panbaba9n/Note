;(function() {

    angular
        .module('notes')
        .controller('ShareController', shareController);


    shareController.$inject = ['$http', '$mdDialog', '$rootScope', 'Note', 'User', 'chousenNote' ];

    function shareController($http, $mdDialog, $rootScope, Note, User, chousenNote) {

        var vm = this;

        /* /////////////////////// */

        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange   = searchTextChange;
        vm.throttle = 300;
        vm.send = send;

        function send() { //TODO: stop here
            console.log(vm.sharedTo);
            console.log(chousenNote);
        }

        function selectedItemChange(item) {
            vm.sharedTo = item;
        }

        function searchTextChange(query) {
            if(query.length < 2) {return;}
            getUsersQuery(query);
        }

        function getUsersQuery(userSearch) {
            vm.users = Note.getUsers({}, {
              "searchstring": userSearch,
              "token": User.getToken()
            }).$promise;
        }

    }
})();