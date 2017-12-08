;(function() {

    angular
    .module('login')
    .factory('Login', Login);

    Login.$inject = ['$resource'];

    ////////////

    function Login($resource) {

        return $resource('', {}, {
            login: {
                method: 'POST',
                url: 'http://localhost:3000/api/login'
            }
        });

        /* /////////////////////// */


        
    };


})();