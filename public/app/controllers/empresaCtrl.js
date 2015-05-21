angular.module('empresaCtrl', ['empresaService'])

.controller('empresaController', function(Empresa) {

	var vm = this;

	vm.processing = true;

	Empresa.all()
		.success(function(data) {
			vm.processing = false;
			vm.empresas = data;
		});

	vm.deleteEmpresa = function(id) {
		vm.processing = true;

		Empresa.delete(id)
			.success(function(data) {		
				Empresa.all()
					.success(function(data) {
						vm.processing = false;
						vm.empresas = data;
					});
			});
	};


})
.controller('empresaCreateController', function(Empresa) {
	
	var vm = this;

	vm.type = 'create';

	vm.saveEmpresa = function() {
		vm.processing = true;
		vm.message = '';


		Empresa.create(vm.empresaData)
			.success(function(data) {
				vm.processing = false;
				vm.empresaData = {};
				vm.message = data.message;
			});
			
	};	

})


.controller('empresaEditController', function($routeParams, Empresa) {

	var vm = this;

	vm.type = 'edit';

	Empresa.get($routeParams.empresa_id)
		.success(function(data) {
			vm.empresaData = data;
		});

	vm.saveEmpresa = function() {
		vm.processing = true;
		vm.message = '';

		Empresa.update($routeParams.empresa_id, vm.empresaData)
			.success(function(data) {
				vm.processing = false;
				
				vm.empresaData = {};
				
				vm.message = data.message;
			});
	};

});