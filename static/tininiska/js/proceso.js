
var tininiskApp = angular.module('tininiskApp',['djng.forms']).config(function($httpProvider){
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});


tininiskApp.controller('mainController',['$scope','$http','$interval',function($scope,$http,$interval){

	$scope.contenido = null;
	$scope.verDetalle = false;
	$scope.mensaje = null;

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

	$scope.CierraDetalle = function(mensaje){
		
		$scope.verDetalle = false;
		$scope.contenido = false;
		$scope.mensaje = mensaje;
		$interval(function(){
			$scope.mensaje = null;
		},5000);
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

	ctrl.FormClienteNuevo = function(mensaje){

		if(mensaje.mensaje){
			ctrl.onUpdate(mensaje.mensaje);
			ctrl.FormReservacion();
		}else{
			ctrl.onUpdate(mensaje.error);
		}

	};


	ctrl.SeleccionaCliente = function(){
		ctrl.compCliente = true;
		ctrl.formCliente = false;
		ctrl.formReserva = false;
	};

	ctrl.FormReservacion = function(){
		ctrl.formCliente = false;
		ctrl.formReserva = true;
	};

	ctrl.CierraDetalle = function(mensaje){
		ctrl.mensaje = mensaje
		ctrl.close(ctrl.mensaje);
	};

}]);

tininiskApp.controller('FormularioClienteController',['$scope','$element','$attrs','$http',function($scope,$element,$attrs,$http){

	var ctrl = this;
	ctrl.mensaje = "";

	ctrl.form_cliente_submit = function(){
		datos = ctrl.cliente_data;
		var _ruta = angular.element('form').attr('action');
		$http.post(_ruta,datos).then(function(response){
			ctrl.mensaje = response.data;
			ctrl.close(ctrl.mensaje);
		}).else(function(response){
			ctrl.mensaje = response.data;
			ctrl.close(ctrl.mensaje);
		});
	};

}]);

tininiskApp.controller('FormularioReservacionController',['$scope','$element','$attrs',function($scope,$element,$attrs){

	var ctrl = this;
	ctrl.mensaje = "";

	ctrl.form_reservacion_submit = function(){
		datos = ctrl.reservacion_data;
		var _ruta = angular.element('form').attr('action');
		$http.post(_ruta,datos).then(function(response){
			ctrl.mensaje = response.data;
			ctrl.close(ctrl.mensaje.mensaje);
		}).else(function(response){
			ctrl.mensaje = response.data;
			ctrl.close(ctrl.mensaje.error);
		});
	};

}]);

tininiskApp.controller('FormularioContactoController',['$scope','$element','$attrs',function($scope,$element,$attrs){

	var ctrl = this;
	ctrl.mensaje = "";

	ctrl.form_contacto_submit = function(){
		datos = ctrl.contacto_data;
		var _ruta = angular.element('form').attr('action');
		$http.post(_ruta,datos).then(function(response){
			ctrl.mensaje = response.data;
			ctrl.close(ctrl.mensaje.mensaje);
		}).else(function(response){
			ctrl.mensaje = response.data;
			ctrl.close(ctrl.mensaje.error);
		});
	};

}]);

tininiskApp.component('detallePaquete',{
	templateUrl:['$element','$attrs',function($element,$attrs){
		var _ruta = $attrs.plantilla;
		
		return _ruta;
	}],
	controller:'DetallePaqController',
	bindings:{
		mensaje:'=',
		onUpdate:'&',
		'close':'&onClose',
	},
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
		mensaje:'=',
		'close':'&onClose',
		'update':'&onUpdate',
	},
});

tininiskApp.component('formularioReservacion',{
	templateUrl:'reservaciones/nuevo/',
	controller:'FormularioReservacionController',
	bindings:{
		mensaje:'=',
		'close':'&onClose',
	},
});

tininiskApp.component('formularioContacto',{
	template:'contactanos/',
	controller:'FormularioContactoController',
	bindings:{
		mensaje:'=',
		'close':'&onClose',
	},
});

