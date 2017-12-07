;(function() {

    angular
    .module('infotable')
    .factory('DataInfotable', DataInfotable);

    DataInfotable.$inject = ['$http'];

    ////////////

    function DataInfotable($http) {

        return {
            variable: variable
        }

        ////////////  function definitions

        function variable() {
            return 'test';
        }
        
    };


})();