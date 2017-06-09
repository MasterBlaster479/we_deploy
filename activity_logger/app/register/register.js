'use strict';

angular.module('myApp.register', ['ngRoute', 'ngMessages', 'myApp.authentication'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: '/register/register.html',
            controller: 'RegisterCtrl'
        });
    }])
    .controller('RegisterCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
        $scope.new_user = {first_name: '',last_name: '', e_mail: '', password: '', login: ''};
        $scope.failed = false;
        $scope.register = function() {
            Auth.register($scope.new_user.first_name, $scope.new_user.last_name, $scope.new_user.e_mail,
                $scope.new_user.password, $scope.new_user.login)
                .then(function() {
                    $location.path("/");
                }, function() {
                    $scope.failed = true;
                });
        };
    }]);