angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})
		.when('/home', {
			templateUrl : 'app/views/pages/home.html'
   			
		})
		
		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    			controllerAs: 'login'
		})
		
		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})
		

		// form to create a new user
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})

		//empresas
		.when('/empresas', {
			templateUrl: 'app/views/pages/empresas/empresas.html',
			controller: 'empresaController',
			controllerAs: 'empresa'
		})
		.when('/empresas/create', {
			templateUrl: 'app/views/pages/empresas/single.html',
			controller: 'empresaCreateController',
			controllerAs: 'empresa'
		})
		
		.when('/empresas/:empresa_id', {
			templateUrl: 'app/views/pages/empresas/single.html',
			controller: 'empresaEditController',
			controllerAs: 'empresa'
		})

		.when('/empresas/ver/:empresa_id', {
			templateUrl: 'app/views/pages/empresas/single.html',
			controller: 'empresaViewController',
			controllerAs: 'empresa'
		})

		//Eventos
		.when('/eventos', {
			templateUrl: 'app/views/pages/eventos/eventos.html',
			controller: 'eventoController',
			controllerAs: 'evento'
		})
		.when('/eventos/:empresa_id', {
			templateUrl: 'app/views/pages/eventos/eventos.html',
			controller: 'eventoControllerFixed',
			controllerAs: 'evento'
		})
		
		.when('/proyectos/:empresa_id', {
			templateUrl: 'app/views/pages/proyectos/singleP.html',
			controller: 'proyectoControllerNew',
			controllerAs: 'proyecto'
		})
		.when('/proyectos', {
			templateUrl: 'app/views/pages/proyectos/singleP.html',
			controller: 'proyectoControllerNew',
			controllerAs: 'proyecto'
		});


	$locationProvider.html5Mode(true);

});
