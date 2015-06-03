angular.module('empresaService', [])

.factory('Empresa',function($http){
	var empresaFactory = {};

	empresaFactory.get = function(id){
		return $http.get('/api/empresas/'+id);
	};

	empresaFactory.all = function() {
		return $http.get('/api/empresas/');
	};

	
	empresaFactory.create = function(empresaData) {
		return $http.post('/api/empresas/', empresaData);
	};

	
	empresaFactory.update = function(id, empresaData) {
		return $http.put('/api/empresas/' + id, empresaData);
	};

	
	empresaFactory.delete = function(id) {
		var confirmacion = confirm("¿Estas seguro de que deseas borrar esta empresa?\n¡Esta accion borrara la empresa y todos sus datos permanentemente!");
		if(confirmacion){
			return $http.delete('/api/empresas/' + id);
		}else{
			return $http.get('/api/empresas/');
		}
	};

	empresaFactory.deleteContacto = function(idcont, idempresa){
		var confirmacion = confirm("¿Estas seguro de que deseas borrar este contacto?"+
									"\n¡Esta accion borrara el contacto y todos sus datos permanentemente!");
		if(confirmacion){
			return $http.delete('/api/empresas/cont/' + idcont+'/'+idempresa);
		}else{
			return $http.get('/api/empresas/');
		}
		
	}

	return empresaFactory;
})