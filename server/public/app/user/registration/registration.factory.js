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
                url: 'http://localhost:3000/api/registration'
            }
        });

        ////////////  function definitions


        
    };


})();