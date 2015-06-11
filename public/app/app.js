angular.module('userApp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl','userService','empresaCtrl','empresaService','eventoCtrl', 'eventoService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

})
  	.filter('capitalize', function() {
		return function(input, scope) {
			if (input!=null)
				input = input.toLowerCase();
			return input.substring(0,1).toUpperCase()+input.substring(1);
		}
	})
 	.filter('underScoreTrim', function() {
		 return function(text) {
		    return String(text).replace(/_/mg, " ");
		  };
	})
	;