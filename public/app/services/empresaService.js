angular.module('empresaService', [])

.factory('Empresa',function($http){
	var empresaFactory = {};

	empresaFactory.get = function(id){
		return $http.get('/api/empresas/'+id);
	};

	empresaFactory.all = function() {
		return $http.get('/api/empresas/');
	};

	// create a user
	empresaFactory.create = function(empresaData) {
		return $http.post('/api/empresas/', empresaData);
	};

	// update a user
	empresaFactory.update = function(id, empresaData) {
		return $http.put('/api/empresas/' + id, empresaData);
	};

	// delete a user
	empresaFactory.delete = function(id) {
		return $http.delete('/api/empresas/' + id);
	};
	return empresaFactory;
})