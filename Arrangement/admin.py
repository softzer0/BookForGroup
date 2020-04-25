from django.contrib import admin
from .models import Arrangement


class ArrangementAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'user', 'number_of_people', 'price', 'discount')


admin.site.register(Arrangement, ArrangementAdmin)
