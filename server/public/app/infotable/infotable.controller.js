;(function() {

    angular
    .module('infotable')
    .controller('InfotableController', infotableController);

    infotableController.$inject = ['$rootScope', 'DataInfotable', 'User'];


    function infotableController($rootScope, DataInfotable, User) {

        // 'controller as' syntax
        var vm = this;

        vm.notes = [];
        vm.addNotebook = addNotebook;
        vm.addByEnter = addByEnter;
        vm.notebook = {};
        // vm.doAny = doAny;
        vm.update = update;
        vm.reset = reset;
        vm.save = save;
        vm.delete = deleteNotebook;

        getNotes();

        // console.log(vm.notes);

        /* /////////////////////// */

        function getNotes() {
            var notes = DataInfotable.getNotebooks({}, {"token": User.getToken()});

            notes.$promise.then(function(data) {
                vm.notes = notes;
            }, function(err) {
                if (err.status === 401) {
                    console.log('Not autorized');
                    User.logout();
                    $rootScope.$emit('loging', {});
                } else {
                    console.log(err);
                }
            });

        };

        function addNotebook() {
            if (vm.notebook.title == " ") return;
            DataInfotable.addNotebook({}, {
                "title": vm.notebook.title,
                "token": User.getToken()
            }, function(response) {
                vm.message = null;
                vm.notebook.title = " ";
                getNotes();
            }, function(err) {
                console.log(err.data.message);
                vm.message = err.data.message;
            });
        };

        function addByEnter(keyEvent) {
            if (keyEvent.which === 13) {
                if (!vm.notebook.title || vm.notebook.title == " ") return;
                addNotebook();
            }
        };

        function update(notebook) {
            notebook.eddite = !notebook.eddite;
            notebook.originaltitle = notebook.title;
        };

        function reset(notebook) {
            notebook.title = notebook.originaltitle;
            notebook.eddite = !notebook.eddite;
        };

        function save(notebook) {
            if (!notebook.title || notebook.title == " ") return;
            DataInfotable.upgradeNotebook({}, {
                "notebook": notebook,
                "token": User.getToken()
            }, function(response) {
                getNotes();
            }, function(err) {
                console.log(err.data.message);
            });
        };

        function deleteNotebook(notebook) {
            DataInfotable.delNotebook({}, {
                "notebook": notebook,
                "token": User.getToken()
            }, function(response) {
                getNotes();
            }, function(err) {
                console.log(err.data.message);
            });
        };
        
    };

})();