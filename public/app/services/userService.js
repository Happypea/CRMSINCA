angular.module('userService', [])

.factory('User', function($http) {

	// create a new object
	var userFactory = {};

	// get a single user
	userFactory.get = function(id) {
		return $http.get('/api/users/' + id);
	};

	// get all users
	userFactory.all = function() {
		return $http.get('/api/users/');
	};

	// create a user
	userFactory.create = function(userData) {
		return $http.post('/api/users/', userData);
	};

	// update a user
	userFactory.update = function(id, userData) {
		return $http.put('/api/users/' + id, userData);
	};

	// delete a user
	userFactory.delete = function(id) {
		return $http.delete('/api/users/' + id);
	};

	// return our entire userFactory object
	return userFactory;

});/*,


.factory('Empresa',function($http){
	var empresaFactory = {};

	empresaFactory.get = function(id){
		return $http.get('/api/empresas/'+id);
	};

	empresaFactory.all = function() {
		return $http.get('/api/empresas/');
	};

	// create a user
	empresaFactory.create = function(eData) {
		return $http.post('/api/empresas/', eData);
	};

	// update a user
	empresaFactory.update = function(id, eData) {
		return $http.put('/api/empresas/' + id, eData);
	};

	// delete a user
	empresaFactory.delete = function(id) {
		return $http.delete('/api/empresas/' + id);
	};

})*/