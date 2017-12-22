;(function() {

    angular
    .module('notes')
    .factory('Note', Note);

    Note.$inject = ['$resource', 'User'];

    ////////////

    function Note($resource, User) {

        return $resource('', {}, {
            getNotes: {
                method: 'POST',
                url: 'http://localhost:3000/api/notes',
                isArray: true
            },
            addNote: {
                method: 'POST',
                url: 'http://localhost:3000/api/notes/add'
            },
            delNote: {
                method: 'POST',
                url: 'http://localhost:3000/api/notes/del'
            },
            upgradeNote: {
                method: 'POST',
                url: 'http://localhost:3000/api/notes/update'
            },
            getUsers: {
                method: 'POST',
                url: 'http://localhost:3000/api/users'
            }
        });

        ////////////  function definitions

        
    };


})();