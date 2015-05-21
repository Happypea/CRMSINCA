angular.module('eventoCtrl', ['eventoService'])

.controller('eventoController', function(Evento) {

	var vm = this;

	vm.processing = true;

	Evento.all()
		.success(function(data) {
			vm.processing = false;
			vm.evento = data;
		});

	vm.deleteEvento = function(id) {
		vm.processing = true;

		Evento.delete(id)
			.success(function(data) {		
				Evento.all()
					.success(function(data) {
						vm.processing = false;
						vm.evento = data;
					});
			});
	};
	vm.saveEvento = function() {
		vm.processing = true;
		vm.message = '';


		Evento.create(vm.eventoData)
			.success(function(data) {
				vm.processing = false;
				vm.eventoData = {};
				vm.message = data.message;
			});
			
	};	
});