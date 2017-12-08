;(function() {

    angular
    .module('user')
    .factory('User', User);

    User.$inject = ['localStorageService', '$state'];

    ////////////

    function User(localStorageService, $state) {
        var _name = null,
            _token = null,
            _isAuth = null;

        return {
            setName: setName,
            getName: getName,
            setToken: setToken,
            getToken: getToken,
            setAuth: setAuth,
            getAuth: getAuth,
            logout: logout
        }

        /* /////////////////////// */

        function setName(name) {
            localStorageService.set('name', name);
        };

        function getName() {
            return localStorageService.get('name');
        };

        function setToken(token) {
            localStorageService.set('token', token);
        };

        function getToken(token) {
            return localStorageService.get('token');
        };

        function setAuth(isAuth) {
            localStorageService.set('isAuth', isAuth || null);
        };

        function getAuth(token) {
            return localStorageService.get('isAuth');
        };

        function logout() {
          localStorageService.remove('token');
          localStorageService.remove('name');
          localStorageService.remove('isAuth');
          $state.go('login');
        };

        // function setName(name) {
        //     _name = name;
        // };

        // function getName() {
        //     return _name;
        // };

        // function setToken(token) {
        //     _token = token;
        // };

        // function getToken(token) {
        //     return _token;
        // };

        // function setAuth(isAuth) {
        //     _isAuth = isAuth || null;
        // };

        // function getAuth(token) {
        //     return _isAuth;
        // };

        // function logout() {
        //   _name = null;
        //   _token = null;
        //   _isAuth = null;
        //   $state.go('login');
        // };
        
    };


})();