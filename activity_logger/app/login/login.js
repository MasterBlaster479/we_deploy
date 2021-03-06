'use strict';

angular.module('myApp.login', ['ngRoute','ngMessages', 'myApp.authentication', 'myApp.server_error'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/login/login.html',
            controller: 'LoginCtrl'
        });
    }])
    .controller('LoginCtrl', ['$scope', '$location', '$window', 'Auth' , function($scope, $location, $window, Auth) {
        $scope.user = {login: '', password: ''};
        $scope.failed = false;
        $scope.errors = {};
        $scope.login = function() {
            Auth.login($scope.user.login, $scope.user.password)
                .then(function() {
                    event.preventDefault();
                    $location.path("/");
                }, function(response) {
                    if (response.status == -1) {
                        $window.alert("Server is not responding, report the problem to WeDeploy crew " +
                            "wedeploy@liferay.com !");
                    }
                    angular.forEach(response.data.errors, function(errors, field){
                        // notify form that field is invalid
                        $scope.form[field].$setValidity('server', false);
                        // store the error messages from the server
                        $scope.errors[field] = errors.join(', ');
                    });
                    $scope.failed = true;
                })
        };
    }]);