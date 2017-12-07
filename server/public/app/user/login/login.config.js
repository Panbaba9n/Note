;(function() {

    angular
    .module('login')
    .config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {


		$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'app/user/login/login.html',
			controller: 'LoginController',
			controllerAs: 'login',
			isAuthentificaded: true
		});

	};
    
})();