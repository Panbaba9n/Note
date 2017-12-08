;(function() {

	angular
	.module('logout')
	.controller('LogoutController', LogoutController);

	LogoutController.$inject = ['$rootScope','User'];

	function LogoutController($rootScope, User) {

		var vm = this;

		vm.checkAuth = User.getAuth();
		vm.logout = logout;
		vm.name = User.getName();

		$rootScope.$on('loging', function(event, data) {
            vm.checkAuth = User.getAuth();
            vm.name = User.getName();
        });


        /* /////////////////////// */

        function logout() {
            User.logout();
            vm.checkAuth = User.getAuth();
            vm.name = User.getName();
        }

        /* Fast hardcode we acn use it as function */
        // vm.checkAuth = checkAuth;
        // function checkAuth() {
        //     return User.getAuth();
        // }
        /* Send from another place */
        // $rootScope.$emit('testEvent', {login: true, userData: {some: 'test'}});

	};

})();