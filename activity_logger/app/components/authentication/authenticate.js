'use strict';

angular.module('myApp.authentication', ['ngResource', 'ngStorage', 'myApp.host_config'])
.factory('Auth', function($resource, $rootScope, $sessionStorage, $q, HostConfig){

    /**
     *  User profile resource
     */
    var Profile = $resource(HostConfig.getLocation() + '/api/users/', {}, {
        login: {
            url: HostConfig.getLocation() + '/api/users/login',
            params: {username:'@username', password: '@password'},
            method: "GET",
            isArray : false
        },
        register: {
            method: "POST",
            isArray : false
        },
        update: {
            url: HostConfig.getLocation() + '/api/users/:id',
            method: "PUT",
            isArray : false
        }
    });

    var auth = {};

    /**
     *  Saves the current user in the root scope
     *  Call this in the app run() method
     */
    auth.init = function(){
        if (auth.isLoggedIn()){
            $rootScope.user = auth.currentUser();
        }
    };

    auth.login = function(login, password){
        return $q(function(resolve, reject){
            Profile.login({username:login, password:password}).$promise
            .then(function(data) {
                $sessionStorage.user = data;
                $rootScope.user = $sessionStorage.user;
                resolve();
            }, function(response) {
                reject(response);
            });
        });
    };

    auth.register = function(first_name, last_name, e_mail, password, login){
        return $q(function(resolve, reject){
            var new_user = {"first_name": first_name, "last_name": last_name,
                                "email": e_mail, "password": password, "login": login}
            var send_object = {"user": new_user };
            Profile.register(send_object).$promise
            .then(function(data) {
                resolve();
            }, function(response) {
                return reject();
            });
        });
    };

    auth.logout = function() {
        delete $sessionStorage.user;
        delete $rootScope.user;
    };

    auth.currentUser = function(){
        return $sessionStorage.user;
    };

    auth.isLoggedIn = function(){
        return $sessionStorage.user != null;
    };

    auth.update = Profile.update;

    return auth;
}).value('version', '0.1');