/**
 * Main application controller
 *
 */
 ;(function() {

    angular
    .module('todo')
    .controller('TodoController', TodoController);

    TodoController.$inject = ['$scope', 'User'];


    function TodoController($scope, User) {

        // 'controller as' syntax
        var vm = this;

        vm.authenticated = function () {
            return User.getAuth();
        };


        /* /////////////////////// */


    };

})();