;(function() {

    angular
    .module('registration')
    .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$scope', 'Reg'];


    function RegistrationController($scope, Reg) {

        // 'controller as' syntax
        var vm = this;

        vm.user = {};
        vm.message = false;
        vm.send = send;

        ////////////  function definitions

        function send() {
            Reg.registration({}, {
                "name": vm.user.name,
                "password": vm.user.password
            }, function(response){
                vm.message = response.message;
            }, function(err) {
                if(err.status !== -1) {
                    vm.message = err.data.message;
                } else if (err.status == -1) {
                    vm.message = "Not connected, probably server doesn't work.";
                }
            });
        };
    };

})();