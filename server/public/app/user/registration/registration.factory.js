;(function() {

    angular
    .module('registration')
    .factory('Reg', Reg);

    Reg.$inject = ['$resource'];

    ////////////

    function Reg($resource) {

        return $resource('', {}, {
            registration: {
                method: 'POST',
                url: 'http://localhost:8000/registration'
            }
        });

        ////////////  function definitions


        
    };


})();