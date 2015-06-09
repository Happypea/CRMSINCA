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

	vm.saveProyecto = function(){
		vm.processing = true;
		vm.message='';
		
		Empresa.update(vm.empresaData.empresaID._id, vm.empresaData)
			.success(function(data) {
					vm.processing = false;	
					vm.message = data.message;
					window.location.reload();
				});

		vm.processing = false;
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

.controller('empresaViewController', function($routeParams, Empresa) {

	var vm = this;

	vm.type = 'view';

	Empresa.get($routeParams.empresa_id)
		.success(function(data) {
			vm.empresaData = data;
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

.controller('empresaEditController', function($routeParams, Empresa) {

	var vm = this;

	vm.type = 'edit';

	
	Empresa.get($routeParams.empresa_id)
		.success(function(data) {
			vm.empresaData = data;
		});

	vm.deleteContacto = function(contId, empreId){
		vm.processing = true;
		vm.message = '';

		Empresa.deleteContacto(contId, empreId)
		.success(function(data) {		
			Empresa.all()
				.success(function(data) {
					vm.processing = false;
					vm.empresas = data;
					window.location.reload();
					vm.message=data.message;
				});
		});
	};
	
	

	vm.saveEmpresa = function() {
		vm.processing = true;
		vm.message = '';

		Empresa.update($routeParams.empresa_id, vm.empresaData)
			.success(function(data) {
				vm.processing = false;		
								
				vm.message = data.message;
				window.location.reload();
			});
	};

	
})




//Controllers de los proyectos probablemente haya que sacarlo de aqui y hacer us propio service

.controller('proyectoControllerNew', function($routeParams, Empresa){
	var vm = this;

	vm.type = 'New';

	Empresa.get($routeParams.empresa_id)
		.success(function(data) {
			vm.empresaData = data;
		});


		
});