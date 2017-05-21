'use strict';

angular.module('myApp.activity', ['ngRoute', 'ngResource', 'myApp.ActivityResource'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/activities', {
                templateUrl: '/app/activity/activity.html',
                controller: 'ActivityCtrl'
        }).when('/activity/new', {
            templateUrl: '/app/activity/activity_edit.html',
            controller: 'ActivityNewCtrl'
        }).when('/today_activities', {
            templateUrl: '/app/activity/activity.html',
            controller: 'ActivityTodayCtrl'
        })
    }])
    .controller('ActivityCtrl', ['$scope', '$location', 'Activity',function($scope, $location, Activity) {
        $scope.activities = {};
    }])
    .controller('ActivityNewCtrl', ['$scope', '$location', 'Activity',function($scope, $location, Activity) {
        $scope.activities = {};
    }])
    .controller('ActivityTodayCtrl', ['$scope', '$location', 'Activity',function($scope, $location, Activity) {
        $scope.activities = {};
    }]);