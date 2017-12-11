;(function() {

    angular
    .module('infotable')
    .factory('DataInfotable', DataInfotable);

    DataInfotable.$inject = ['$resource', 'User'];

    ////////////

    function DataInfotable($resource, User) {

        return $resource('', {}, {
            getNotebooks: {
                method: 'POST',
                url: 'http://localhost:3000/api/notebooks',
                isArray: true
            }
        });

        ////////////  function definitions

        
    };


})();