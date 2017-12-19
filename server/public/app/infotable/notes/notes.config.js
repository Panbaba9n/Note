;(function() {

	angular
	.module('notes')
	.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {


		$stateProvider
		.state('notebook', {
			url: '/notebook-:title-:id',
			templateUrl: 'app/infotable/notes/notes.html',
			controller: 'NotebookController',
			controllerAs: 'notebook'
		});

	};


})();