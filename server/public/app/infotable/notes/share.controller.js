;(function() {

  angular
  .module('notes')
  .controller('ShareController', shareController);


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

    function searchTextChange(query) {
      getUsersQuery(query);
    }

    // function getUsersQuery(userSearch) {
    //   // vm.users = $http
    //   vm.items = $http
    //   .post('http://localhost:3000/api/users', {
    //     "token": User.getToken()
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //     return response.data;
    //   }, function (err) {
    //     console.log(err);
    //   });
    // }
    function getUsersQuery(userSearch) {
      // vm.items = Note.getUsers({}, {"token": User.getToken()}).$promise;
      vm.users = Note.getUsers({}, {}).$promise;
    }

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


  };
})();