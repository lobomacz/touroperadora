# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.db import models
from django.core.urlresolvers import reverse
from django.utils.encoding import python_2_unicode_compatible

# Create your models here.

@python_2_unicode_compatible    
class PAQUETE(models.Model):
	# TODO: Define fields here
	titulo = models.CharField(max_length=50)
	descripcion = models.CharField('Descripción' , max_length=250)
	costo = models.DecimalField('Costo U$ x pers.', max_digits=5, decimal_places=2)

	class Meta:
	    verbose_name = "Paquete"
	    verbose_name_plural = "Paquetes"

	def __str__(self):
	    return self.titulo.upper()

	def get_absolute_url(self):
	    return reverse('vdetalle_paquete',kwargs={"id":self.id})


class IMAGEN(models.Model):
	imagen = models.ImageField(upload_to='tininiska/imgs')
	descripcion = models.CharField('Descripción' , max_length=100)
	titulo = models.CharField(max_length=50)
	paquete = models.ForeignKey(PAQUETE,related_name='imagenes', on_delete=models.CASCADE)

	class Meta:
		verbose_name = "Imagen"
		verbose_name_plural = "Imagenes"


@python_2_unicode_compatible
class CLIENTE(models.Model):
	nombre = models.CharField('Nombre', max_length=150)
	apellido = models.CharField('Apellido', max_length=150)
	fecha_nac = models.DateField('Fecha de Nacimiento')
	telefono = models.CharField('Teléfono' , max_length=15)
	email = models.EmailField('Correo-e')
	paquetes_res = models.ManyToManyField(PAQUETE,through='RESERVACION')

	def __str__(self):
		return "{0} {1}".format(self.nombre.capitalize(), self.apellido.capitalize())

	class Meta:
		ordering = ['nombre',]
		verbose_name = "Cliente"
		verbose_name_plural = "Clientes"

	@models.permalink
	def get_absolute_url(self):
		return reverse('vdetalle_cliente',args={"id":str(self.id)})


class RESERVACION(models.Model):
	paquete = models.ForeignKey(PAQUETE, on_delete=models.CASCADE)
	cliente = models.ForeignKey(CLIENTE, on_delete=models.CASCADE)
	fecha_res = models.DateField('Fecha de Reservación')
	cant_pers = models.PositiveIntegerField('Cantidad de Personas')

	class Meta:
		ordering=['fecha_res',]
		verbose_name = "Reservación"
		verbose_name_plural = "Reservaciones"
    


class ImagenInline(admin.StackedInline):
	model = IMAGEN
		

class PaqueteAdmin(admin.ModelAdmin):
	inlines = [ImagenInline]
		
    
admin.site.register(PAQUETE,PaqueteAdmin)
admin.site.register(IMAGEN)

    


    
    