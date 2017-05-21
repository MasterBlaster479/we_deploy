'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.login',
    'myApp.register'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    // $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode({enabled:true, requireBase:false});
    $routeProvider.
    when("/", {
            templateUrl: '/app/app.html', controller:"AppCtrl"
        }).
    otherwise({redirectTo: '/'});
}]).controller('AppCtrl', function ($scope, $rootScope, $location, Auth) {
    $rootScope.logout = function(){
        Auth.logout();
        $location.path("/login");
    };
});

myApp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    Auth.init();
    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (!Auth.isLoggedIn()){
            if (next.templateUrl === '/app/login/login.html' || next.templateUrl === '/app/register/register.html') {
            }
            else {
                event.preventDefault();
                $location.path("/login");
            }
        }
    });
}]);
