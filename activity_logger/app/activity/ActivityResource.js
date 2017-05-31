angular.module('myApp.ActivityResource', ['ngResource', 'myApp.host_config'])
.factory('Activity', function($resource, $rootScope, HostConfig){
    var proxy = {};
    proxy.resource = $resource(HostConfig.getLocation() + '/api/activities/:id/:verb',{id: '', verb:''},
                                    {
                                        update: {method: 'PUT'},
                                        today_activities: {'method': 'GET', params: {verb: 'today_activities'}}
                                    });
    proxy.static_resource = $resource(HostConfig.getLocation() + '/api/activities/:verb',{verb:''},
                                    {
                                        get: {method: 'GET', isArray: true},
                                        today_activities: {'method': 'GET', isArray: true, params: {verb: 'today_activities'}}
                                    });
    return proxy;
});