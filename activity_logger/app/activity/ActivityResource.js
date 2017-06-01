angular.module('myApp.ActivityResource', ['ngResource', 'myApp.host_config'])
.factory('Activity', function($resource, $rootScope, HostConfig){
    var proxy = {};
    proxy.resource = $resource(HostConfig.getLocation() + '/api/activities/:id/:verb',{id: '', verb:''},
                                    {update: {method: 'PUT'}});
    proxy.static_resource = $resource(HostConfig.getLocation() + '/api/activities/:verb',{verb:''},
                                    {
                                        get: {method: 'GET', isArray: true, params:{user_id: $rootScope.user.id}},
                                        today_activities: {'method': 'GET',
                                                isArray: true,
                                                params: {verb: 'today_activities', user_id: $rootScope.user.id}}
                                    });
    return proxy;
});