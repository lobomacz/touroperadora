from django.conf.urls import url
import views

urlpatterns = [
	url(r'^$',views.inicio),
	url(r'^paquetes/(?P<id>\d+)/$',views.detalle_paquete,name='vdetalle_paquete'),
	url(r'^reservaciones/nuevo/$',views.nueva_reservacion,name='vnueva_reservacion'),
	url(r'^cliente/nuevo/$',views.nuevo_cliente,name='vnuevo_cliente'),
	url(r'^cliente/(?P<id>\d+)/$',views.detalle_cliente,name='vdetalle_cliente'),
	url(r'^cliente/lista/$',views.lista_cliente),
	url(r'^contactanos/$',views.contactanos,name='vcontactanos'),
]