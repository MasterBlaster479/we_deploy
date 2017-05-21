'use strict';

angular.module('myApp.server_error', [])
.directive('serverError', function(){
    return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ctrl){
      element.on('change', function(){
        scope.$apply(function(){
          ctrl.$setValidity('server', true);
        });
      });
    }
  }
}).value('version', '0.1');
