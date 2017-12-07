;(function() {

    angular
    .module('registration')
    .config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {


		$stateProvider
		.state('registration', {
			url: '/registration',
			templateUrl: 'app/user/registration/registration.html',
			controller: 'RegistrationController',
			controllerAs: 'registration',
			isAuthentificaded: true
		});

	};
    
})();