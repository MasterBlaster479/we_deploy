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
        }).when('/activity/edit/:id', {
            templateUrl: '/app/activity/activity_edit.html',
            controller: 'ActivityEditCtrl'
        }).when('/today_activities', {
            templateUrl: '/app/activity/today_activity.html',
            controller: 'ActivityTodayCtrl'
        })
    }])
    .controller('ActivityCtrl', ['$scope', '$location', 'Activity',function($scope, $location, Activity) {
        Activity.static_resource.get().$promise.then(function (response) {
            $scope.activities = response;
        });
    }])
    .controller('ActivityNewCtrl', ['$scope', '$location', '$window', 'Activity',function($scope, $location, $window, Activity) {
        $scope.activity = {
            user_id: $scope.user.id,
            description: '',
            start_date: new Date(),
            end_date: new Date()
        };
        $scope.save = function(){
            Activity.static_resource.save(this.activity, function(response){
                $window.alert("Successfully made an activity !");
                $location.path('/today_activities')
            }, function(error){
                    if (error.status == -1) {
                        $window.alert("Problem with recording your activity, please report the problem to WeDeploy crew " +
                            "wedeploy@liferay.com !");
                    }
            });
        };
    }])
    .controller('ActivityEditCtrl', ['$scope', '$location', '$routeParams', '$window', 'Activity', function($scope, $location, $routeParams, $window, Activity) {
        Activity.resource.get({id: $routeParams.id}, function(response) {
            $scope.activity = {
                id: response.id,
                user_id: $scope.user.id,
                description: response.description,
                create_date: new Date(response.create_date),
                edit_date: new Date(response.edit_date),
                start_date: new Date(response.start_date),
                end_date: new Date(response.end_date)
            };
        });
        $scope.save = function(){
            Activity.resource.update({id: this.activity.id}, this.activity, function(response){
                console.log(response);
                $location.path('/today_activities')
            }, function(error){
                    if (error.status == -1) {
                        $window.alert("Problem with recording your activity, please report the problem to WeDeploy crew " +
                            "wedeploy@liferay.com !");
                    }
            });
        };
    }])
    .controller('ActivityTodayCtrl', ['$scope', '$location', 'Activity',function($scope, $location, Activity) {
        Activity.static_resource.today_activities().$promise.then(function (response) {
            $scope.activities = response;
        });
    }]);