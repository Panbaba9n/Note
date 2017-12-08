;(function() {

    angular
    .module('login')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', '$state', 'Login', 'User'];


    function LoginController($rootScope, $scope, $state, Login, User) {

        // 'controller as' syntax
        var vm = this;

        vm.message = false;
        vm.send = send;
        vm.user = {};


        /* /////////////////////// */

        function send() {
            Login.login({}, {
                "name": vm.user.name,
                "password": vm.user.password
            }, function(response){
                vm.message = response.message;
                saveUserInfo(response);
                $rootScope.$emit('loging', {/*isAuth: true, name: vm.user.name*/});
                $state.go('infotable');
            }, function(err) {
                User.setAuth(err.data.isAuth);
                User.setName();
                $rootScope.$emit('loging', {/*isAuth: true, name: vm.user.name*/});
                if(err.status !== -1) {
                    vm.message = err.data.message;
                } else if (err.status == -1) {
                    vm.message = "Not connected, probably server doesn't work.";
                }
            });
        };

        function saveUserInfo(response) {
            User.setName( vm.user.name );
            User.setToken( response.token );
            User.setAuth( response.isAuth );
        };

    };

})();