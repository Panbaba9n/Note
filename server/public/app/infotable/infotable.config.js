;(function() {

    angular
    .module('infotable')
    .config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {


		$stateProvider
		.state('infotable', {
			url: '/infotable',
			templateUrl: 'app/infotable/infotable.html',
			controller: 'InfotableController',
			controllerAs: 'infotable'
		});

	};
    
})();