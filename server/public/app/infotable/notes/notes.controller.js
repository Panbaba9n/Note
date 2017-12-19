;(function() {

	angular
	.module('notes')
	.controller('NotebookController', notebookController);

	notebookController.$inject = ['$rootScope', '$stateParams', 'Note', 'User'];

	function notebookController($rootScope, $stateParams, Note, User) {
		
		var vm = this;
		vm.notes = [];
		vm.notebookParams = $stateParams;
		vm.addNote = addNote;
        vm.update = update;
        vm.reset = reset;
        vm.save = save;
        vm.delete = deleteNote;
        vm.share = share;
        vm.isOpen = false;
        vm.searchTextChange = searchTextChange;

		getNotes();

		/* /////////////////////// */

		function getNotes() {
            var notes = Note.getNotes({}, {
            	"token": User.getToken(),
            	"notebookid": vm.notebookParams.id
            });

            notes.$promise.then(function(data) {
                vm.notes = notes;
                vm.noNotesFound = false;
            }, function(err) {
                if (err.status === 401) {
                    console.log('Not autorized');
                    User.logout();
                    $rootScope.$emit('loging', {});
                } else if (err.status === 404) {
                    vm.noNotesFound = true;
                    vm.notes = [];
                } else {
                    console.log(err);
                }
            });

        };

        function addNote() {
            if (vm.note.title == " ") return;
            Note.addNote({}, {
                "title": vm.note.title,
                "content": vm.note.content,
                "notebookid": vm.notebookParams.id,
                "token": User.getToken()
            }, function(response) {
                vm.message = null;
                vm.note.title = " ";
                vm.note.content = " ";
                getNotes();
            }, function(err) {
                console.log(err.data.message);
                vm.message = err.data.message;
            });
        };

        function update(note) {
            note.eddite = !note.eddite;
            note.originaltitle = note.title;
            note.originalcontent = note.content;
        };

        function reset(note) {
            note.title = note.originaltitle;
            note.content = note.originalcontent;
            note.eddite = !note.eddite;
        };

        function save(note) {
            if (!note.title || note.title == " ") return;
            Note.upgradeNote({}, {
                "note": note,
                "notebookid": vm.notebookParams.id,
                "token": User.getToken()
            }, function(response) {
                getNotes();
            }, function(err) {
                console.log(err.data.message);
            });
        };

        function deleteNote(note) {
            Note.delNote({}, {
                "note": note,
                "notebookid": vm.notebookParams.id,
                "token": User.getToken()
            }, function(response) {
                getNotes();
            }, function(err) {
                console.log(err.data.message);
            });
        };

        function share(note) {
            console.log('Shared');
        }

        function searchTextChange(text) {
            if (text.length < 3) {
                return;
            }
            console.log(text);
        }

	};

})();