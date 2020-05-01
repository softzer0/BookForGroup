from django.contrib import admin
from .models import Hotel


class HotelAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'city', 'address', 'web_site')


admin.site.register(Hotel, HotelAdmin)
