# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, render_to_response, get_object_or_404, get_list_or_404
from django.http import Http404, HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.urlresolvers import reverse
import json
import models
import forms
import smtplib

# Create your views here.

def inicio(request):
	if not request.is_ajax():
		lista_paquetes = models.PAQUETE.objects.all()
		return render_to_response('tininiska/inicio.html',locals())
	else:
		raise Http404("El sitio no está accesible.")


def detalle_paquete(request, **kwargs):
	paquete = get_object_or_404(models.PAQUETE,pk=kwargs['id'])
	return render_to_response('tininiska/detalle_paquete.html',locals())


def nueva_reservacion(request):
	metodo = request.method
	if metodo == 'GET':
		form = forms.FormReservacion()
		return render_to_response('tininiska/form_base.html',{'form':form,'action_url':reverse('vnueva_reservacion')})
	elif metodo == 'POST':
		if request.POST.has_key('email_cliente'):
			email_cliente = request.POST['email_cliente']
			data = {'email':email_cliente}
			form = forms.FormReservacion(initial=data)
			form.fields['email'].disabled = True
			return render_to_response('tininiska/form_base.html',{'form':form,'action_url':reverse('vnueva_reservacion')})
		else:
			datos_reservacion = request.POST.copy()
			form = forms.FormReservacion(datos_reservacion)
			if form.is_valid():
				reservacion = form.save()
				return JsonResponse({'mensaje':'Su reservación se aplicó con éxito. Nos pondremos en contacto con usted a la brevedad posible.'})
			else:
				return JsonResponse({'error':'Ocurrió un problema al aplicar su reservación. Por favor intentelo mas tarde.'})

def nuevo_cliente(request):
	metodo = request.method
	if metodo == 'GET':
		form = forms.FormCliente()
		return render_to_response('tininiska/form_base.html',{'form':form,'action_url':reverse('vnuevo_cliente')})
	elif metodo == 'POST':
		datos_cliente = request.POST.copy()
		form = forms.FormCliente(datos_cliente)
		if form.is_valid():
			cliente = form.save()
			return JsonResponse({'mensaje':'Sus datos fueron registrados con éxito. Gracias '})
		else:
			return JsonResponse({'error':'Ocurrió un problema al registrar sus datos. Por favor, vuelva a intentarlo.'})


def contactanos(request):
	metodo = request.method
	if metodo == 'GET':
		form = forms.FormMensaje()
		return render_to_response('tininiska/form_base.html',{'form':form,'action_url':reverse('vcontactanos')})
	elif metodo == 'POST':
		datos_mensaje = json.load(request.body)
		form = forms.FormMensaje(datos_mensaje)
		if form.is_valid():
			toaddr = "lobomacz@gmail.com"
			fromaddr = datos_mensaje['email']
			asunto = datos_mensaje['asunto']
			mensaje = datos_mensaje['mensaje']
			msg = "De: %s \r\nPara: %s\r\nAsunto: %s\r\n\r\n%s" % (fromaddr,toaddr,asunto,mensaje)
			server = smtplib.SMTP('localhost')
			server.set_debuglevel(1)
			server.sendmail(fromaddr,toaddr,msg)
			server.quit()
			return JsonResponse({'mensaje':'Su mensaje ha sido enviado con éxito. Gracias.'})
		else:
			return JsonResponse({'error':'Se generó un problema al enviar su mensaje. Compruebe los datos y vuelva a intenterlo.'})



def lista_cliente(request):
	pass


def detalle_cliente(request, **kwargs):
	pass




