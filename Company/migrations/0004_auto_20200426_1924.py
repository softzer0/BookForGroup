# Generated by Django 3.0.5 on 2020-04-26 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Company', '0003_auto_20200426_1911'),
    ]

    operations = [
        migrations.AddField(
            model_name='companyuser',
            name='name',
            field=models.CharField(default='company', max_length=30),
        ),
        migrations.AddField(
            model_name='companyuser',
            name='phone',
            field=models.CharField(default='111111', max_length=10),
        ),
    ]
