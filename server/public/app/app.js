;(function() {

    /**
     * Definition of the main app module and its dependencies
     */
    angular
        .module('todo', [
          'ui.router',
      		'ngResource',
      		'ngMaterial',
      		'ngMessages',
      		'LocalStorageModule',

      		'infotable',

          'user',
      		'registration',
      		'login',
          'logout'
        ]);


})();