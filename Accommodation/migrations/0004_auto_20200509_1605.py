# Generated by Django 3.0.5 on 2020-05-09 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accommodation', '0003_auto_20200509_1555'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='reserved_from',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='reserved_until',
            field=models.DateTimeField(),
        ),
    ]
