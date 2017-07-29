# -*- coding: utf-8 -*-
from django import forms
from djng.forms import NgModelFormMixin,NgFormValidationMixin
from djng.styling.bootstrap3.forms import Bootstrap3Form,Bootstrap3ModelForm
import models

class FormReservacion(NgModelFormMixin,NgFormValidationMixin,Bootstrap3Form):
	scope_prefix ='reservacion_data'
	form_name = "form_reservacion"
	OPCIONES = models.PAQUETE.objects.values_list('id','titulo')
	email = forms.EmailField(label='Email',required=True)
	paquete = forms.ChoiceField(choices=OPCIONES,label='Paquete Turístico',required=True)
	fecha_res = forms.DateField(label='Fecha de Reservacion',widget=forms.widgets.DateInput(attrs={'validate-date':'^(\d{4})-(\d{1,2})-(\d{1,2})$'}),required=True)
	cantidad_pers = forms.IntegerField(label='Cantidad de Personas',required=True)
	class Meta:
		fields = '__all__'
			

class FormCliente(NgModelFormMixin,NgFormValidationMixin,Bootstrap3ModelForm):
	scope_prefix = 'cliente_data'
	form_name = "form_cliente"
	class Meta:
		model = models.CLIENTE
		exclude = ['paquetes_res',]


class FormContacto(NgModelFormMixin,NgFormValidationMixin,Bootstrap3Form):
	scope_prefix = 'contacto_data'
	form_name = "form_contacto"
	asunto = forms.CharField(label='Asunto',max_length=100)
	email = forms.EmailField(label='Correo-e')
	mensaje = forms.CharField(label='Mensaje',max_length=600,widget=forms.widgets.Textarea)
	class Meta:
		fields = '__all__'
			
		
		

