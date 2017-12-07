;(function() {

    angular
    .module('login')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'Login', 'User'];


    function LoginController($scope, Login, User) {

        // 'controller as' syntax
        var vm = this;

        vm.user = {};
        vm.message = false;
        vm.send = send;

        /* /////////////////////// */

        function send() {
            Login.login({}, {
                "name": vm.user.name,
                "password": vm.user.password
            }, function(response){
                vm.message = response.message;
                User.setName( vm.user.name );
                User.setToken(response.token);
                User.setAuth(response.isAuth);
                // sendToParentCtrl();
                // $state.go('users');
            }, function(err) {
                if(err.status !== -1) {
                    vm.message = err.data.message;
                    User.setAuth(err.data.isAuth);
                } else if (err.status == -1) {
                    vm.message = "Not connected, probably server doesn't work.";
                }
            });
        };
    };

})();