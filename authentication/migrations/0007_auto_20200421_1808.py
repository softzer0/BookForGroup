# Generated by Django 3.0.5 on 2020-04-21 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_auto_20200421_1616'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='address'),
        ),
        migrations.AlterField(
            model_name='user',
            name='city',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='city name'),
        ),
    ]
