from django.contrib import admin
from .models import Accommodation


class AccommodationAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'floor_number')


admin.site.register(Accommodation, AccommodationAdmin)
