# Generated by Django 3.0.5 on 2020-05-12 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Arrangement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='arrangement',
            name='reserved_from',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='arrangement',
            name='reserved_until',
            field=models.DateField(),
        ),
    ]