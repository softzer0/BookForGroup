# Generated by Django 3.0.5 on 2020-05-03 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Room', '0002_auto_20200503_1713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='price_per_adult',
            field=models.FloatField(default=1),
        ),
        migrations.AlterField(
            model_name='room',
            name='price_per_child',
            field=models.FloatField(default=1),
        ),
        migrations.AlterField(
            model_name='room',
            name='room_count',
            field=models.IntegerField(default=1),
        ),
    ]