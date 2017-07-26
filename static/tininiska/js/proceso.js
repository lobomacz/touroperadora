
var tininiskApp = angular.module('tininiskApp',['djng.forms','ngSanitize']).config(function($httpProvider){
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});


tininiskApp.controller('mainController',['$scope','$http',function($scope,$http){

	$scope.contenido = null;
	$scope.verDetalle = false,

	$scope.componenteDetalle = "";
	
	$scope.VerInicio = function(){
		$scope.contenido = null;
		$scope.verDetalle = false;
	};

	$scope.ComponenteDetallePaq = function(event){
		$scope.componenteDetalle = $(event.target).attr("data-componente");


		$scope.verDetalle = true;
		$scope.contenido = true;
	};

}]);

tininiskApp.controller('DetallePaqController',['$scope','$element','$attrs',function($scope,$element,$attrs){

	var ctrl = this;

	ctrl.nuevo = "";
	ctrl.emailCliente = "Marvin Cordoba";

	ctrl.CompruebaCliente = function(nuevo_cliente){

		ctrl.compCliente = false;
		
		if(nuevo_cliente == "si"){
			ctrl.formReserva = true;
		}else{
			ctrl.formCliente = true;
		}

	};

	ctrl.FormContacto = function(){
		ctrl.FormContacto = true;
		ctrl.compCliente = false;
		ctrl.formCliente = false;
		ctrl.formReserva = false;
	}

	ctrl.FormClienteNuevo = function(cliente){

	};


	ctrl.SeleccionaCliente = function(){
		ctrl.compCliente = true;
		ctrl.formCliente = false;
		ctrl.formReserva = false;
	};

	ctrl.CierraDetalle = function(){

	};

}]);

tininiskApp.controller('FormularioClienteController',['$scope','$element','$attrs','$http',function($scope,$element,$attrs,$http){

	var ctrl = this;
	ctrl.mensaje = "";

	ctrl.form_cliente_submit = function(){
		datos = ctrl.cliente_data;
		var _ruta = angular.element('form').attr('action');
		$http.post(_ruta,datos).then(function(response){

		}).else(function(response){

		});
	};


}]);

tininiskApp.controller('FormularioReservacionController',['$scope','$element','$attrs',function($scope,$element,$attrs){

	var ctrl = this;

}]);

tininiskApp.component('detallePaquete',{
	templateUrl:['$element','$attrs',function($element,$attrs){
		var _ruta = $attrs.plantilla;
		
		return _ruta;
	}],
	controller:'DetallePaqController',
});

tininiskApp.component('compruebaCliente',{
	template:'<div><fieldset ng-click="$ctrl.Evaluar()"><p>¿Está registrado como cliente nuestro?</p>'+
			'<label for="nuevo_cliente">Si</label><input type="radio" ng-model="$ctrl.nuevo" name="cliente_si" value="si"/>'+
			'<label for="cliente_no">No</label><input type="radio" ng-model="$ctrl.nuevo" name="cliente_no" value="no" /></fieldset></div>',
	controller:['$scope','$element','$attrs',function($scope,$element,$attrs){

	var ctrl = this;
	
	ctrl.Evaluar = function(){
		ctrl.close();
	};
	
}],
	bindings:{
		nuevo:'=',
		'close':'&onClose',
	},
});

tininiskApp.component('formularioCliente',{
	templateUrl:"cliente/nuevo/",
	controller:'FormularioClienteController',
	bindings:{
		'close':'&onClose',
	},
});

tininiskApp.component('formularioReservacion',{
	templateUrl:'reservaciones/nuevo/',
	controller:'FormularioReservacionController',
	bindings:{
		'close':'&onClose',
	},
});

tininiskApp.component('formularioContacto',{
	template:'contactanos/',
	controller:['$scope','$element','$attrs','$http',function($scope,$element,$attrs){

	}],
	bindings:{
		'close':'&onClose',
	},
});

