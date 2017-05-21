'use strict';

angular.module('myApp.host_config', [])
.factory('HostConfig', function(){
    var host = {};
    host.protocol = 'http';
    host.port = 3000;
    host.url = 'localhost';
    host.getLocation = function () {
        return this.protocol + '://' + this.url +":" + this.port;
    };
    return host;
}).value('version', '0.1');