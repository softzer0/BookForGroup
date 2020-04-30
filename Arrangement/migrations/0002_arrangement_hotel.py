# Generated by Django 3.0.5 on 2020-04-30 00:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Arrangement', '0001_initial'),
        ('Hotel', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='arrangement',
            name='hotel',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='arrangements', to='Hotel.Hotel'),
        ),
    ]