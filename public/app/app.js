angular.module('userApp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl','userService','empresaCtrl','empresaService','eventoCtrl', 'eventoService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

})
  .filter('capitalize', function() {
    return function(input, all) {
      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  });