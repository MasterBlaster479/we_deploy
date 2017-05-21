angular.module('myApp.ActivityResource', ['ngResource', 'myApp.host_config'])
.factory('Activity', function($resource, $rootScope, HostConfig){
    var proxy = {};
    proxy.resource = $resource(HostConfig.getLocation() + '/api/activities/:id/:verb',{id: '', verb:''},
                                    {update: {method: 'PUT'}});
    return proxy;
});