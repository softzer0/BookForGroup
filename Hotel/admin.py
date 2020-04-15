from django.contrib import admin
from .models import Hotel, Room


class RoomAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'numberOfPeople', 'time')


class HotelAdmin(admin.ModelAdmin):
    list_display = ('user', 'address', 'webSite')


admin.site.register(Room, RoomAdmin)
admin.site.register(Hotel, HotelAdmin)
