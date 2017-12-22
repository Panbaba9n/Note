;(function() {

	angular
	.module('notes')
    .controller('NotebookController', notebookController)
	.controller('ShareController', shareController);

	notebookController.$inject = ['$mdDialog', '$rootScope', '$stateParams', 'Note', 'User'];

	function notebookController($mdDialog, $rootScope, $stateParams, Note, User) {
		
		var vm = this;
		vm.notes = [];
		vm.notebookParams = $stateParams;
		vm.addNote = addNote;
        vm.update = update;
        vm.reset = reset;
        vm.save = save;
        vm.delete = deleteNote;

        vm.share = share;
        // vm.users = [];
        // vm.querySearch = querySearch;
        // vm.searchTextChange = searchTextChange;

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

        // function querySearch (query) {
        //     // var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
        //     // deferred;
        //     // getUsersQuery(query);
        //     // console.log(query);
        //     // return results;
        // }

        // function searchTextChange(text) {
        //     if (text.length < 3) {
        //         return;
        //     }

        //     vm.users = $http
        //         .post('http://localhost:3000/api/users', {
        //             "token": User.getToken()
        //         })
        //         .then(function (response) {
        //             return response;
        //         }, function (err) {
        //             console.log(err);
        //         });
            
        //     // getUsersQuery(text);
        // }

        // function getUsersQuery(userSearch) {
        //     Note.getUsers({}, {
        //         "token": User.getToken()
        //     }, function(response) {
        //         console.log(response);
        //         // return response.test;
                
        //     }, function(err) {
        //         console.log(err.data.message);
        //     });
        // }

        // function getUsersQuery(userSearch) {
        //     return vm.users = $http
        //         .post('http://localhost:3000/api/users', {
        //             "token": User.getToken()
        //         })
        //         .then(function (response) {
        //             return response;
        //         }, function (err) {
        //             console.log(err);
        //         });
        // }

        vm.openDialog = function($event, note) {
            console.log($event);
            console.log(note);
            $mdDialog.show({
                controller: 'ShareController',
                controllerAs: 'share',
                // templateUrl: 'dialog.tmpl.html',
                // template: '<div>lol</div><div>lol2</div>',
                templateUrl: 'app/infotable/notes/share.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose:true
            })
        }

  //       vm.selectedItemChange = selectedItemChange;
  //       vm.searchTextChange   = searchTextChange;
  //       vm.throttle = 300;
  //       vm.center = {
  //           lat : 0,
  //           lng : 0,
  //           zoom: 2
  //       };

  //       function selectedItemChange(item) {
  //         vm.result = JSON.stringify(item, null, 2);
  //         vm.center = {
  //           lat : item.lat,
  //           lng : item.lng,
  //           zoom: 15
  //       };
  //   }

  //   function searchTextChange(query) {
  //     vm.items = $http
  //     .get('//maps.googleapis.com/maps/api/geocode/json', {
  //         params: {
  //           address: query
  //       }
  //   })
  //     .then(function (response) {
  //         return response
  //         .data
  //         .results
  //         .map(function (item) {
  //             console.log(item);
  //             return {
  //               display: item.formatted_address,
  //               lat: item.geometry.location.lat,
  //               lng: item.geometry.location.lng,
  //               value: item.formatted_address
  //           };
  //       }) || [];
  //     }, function () {
  //         return [
  //         {
  //             display: 'error',
  //             lat: 0,
  //             lng: 0,
  //             value: ''
  //         }
  //         ];
  //     });
  // }

	};


    shareController.$inject = ['$http', '$mdDialog', '$rootScope', 'Note', 'User'];

    function shareController($http, $mdDialog, $rootScope, Note, User) {
        
        var vm = this;

        /* /////////////////////// */

        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange   = searchTextChange;
        vm.throttle = 300;
        vm.center = {
            lat : 0,
            lng : 0,
            zoom: 2
        };
        vm.lol = lol;

        function lol() {
            console.log('Its alive');
        }

        function selectedItemChange(item) {
            console.log('selectes is changed');
        }

        // function selectedItemChange(item) {
        //     vm.result = JSON.stringify(item, null, 2);
        //     vm.center = {
        //         lat : item.lat,
        //         lng : item.lng,
        //         zoom: 15
        //     };
        // }

    function searchTextChange(query) {
        getUsersQuery(query);
    //   vm.items = $http
    //   .get('//maps.googleapis.com/maps/api/geocode/json', {
    //       params: {
    //         address: query
    //     }
    // })
    //   .then(function (response) {
    //       return response
    //       .data
    //       .results
    //       .map(function (item) {
    //           console.log(item);
    //           return {
    //             display: item.formatted_address,
    //             lat: item.geometry.location.lat,
    //             lng: item.geometry.location.lng,
    //             value: item.formatted_address
    //         };
    //     }) || [];
    //   }, function () {
    //       return [
    //       {
    //           display: 'error',
    //           lat: 0,
    //           lng: 0,
    //           value: ''
    //       }
    //       ];
    //   });

  }

  function getUsersQuery(userSearch) {
            // vm.users = $http
            vm.items = $http
                .post('http://localhost:3000/api/users', {
                    "token": User.getToken()
                })
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                }, function (err) {
                    console.log(err);
                });
        }
    };

})();