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

.controller('proyectoVerController', function($routeParams, Empresa){
	var vm = this;

	vm.type = 'Ver';
	var empresaSeleccionada = '';
	Empresa.all()
		.success(function(data) {	
			
			angular.forEach(data, function(value, key){					
				angular.forEach(data[key]["proyectos"], function(value2, key2){				
					angular.forEach(data[key]["proyectos"][key2], function(value3, key3){	
						value3 == $routeParams.proyectoID ? empresaSeleccionada = data[key]:'';
						value3 == $routeParams.proyectoID ? proyectoSeleccionado = data[key]["proyectos"][key2]:'';



					});
				});
			});

			vm.empresas = empresaSeleccionada;
			vm.proyectoSelec = proyectoSeleccionado;

		});

	
	

	

		
});