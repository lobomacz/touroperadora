# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-07-25 22:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tininiska', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cliente',
            old_name='paquetes_res',
            new_name='paquetes',
        ),
        migrations.AlterField(
            model_name='paquete',
            name='costo',
            field=models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Costo U$ x pers.'),
        ),
    ]
