angular.module('eventoService', [])

.factory('Evento',function($http){
	var eventoFactory = {};

	eventoFactory.get = function(id){
		return $http.get('/api/eventos/'+id);
	};

	eventoFactory.all = function() {
		return $http.get('/api/eventos/');
	};

	// create a user
	eventoFactory.create = function(eventoData) {
		return $http.post('/api/eventos/', eventoData);
	};

	// update a user
	eventoFactory.update = function(id, eventoData) {
		return $http.put('/api/eventos/' + id, eventoData);
	};

	// delete a user
	eventoFactory.delete = function(id) {
		return $http.delete('/api/eventos/' + id);
	};
	return eventoFactory;
})