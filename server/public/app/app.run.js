;(function() {

    angular
    .module('todo')
    .run(run);

	run.$inject = ['$rootScope', '$state', 'User'];

	function run($rootScope, $state, User) {

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if (toState.isAuthentificaded) {
				/*nothing to do*/
			} else if ( !User.getAuth() ) {
				event.preventDefault();
				$state.go('login');
			}
		});

	};
    
})();