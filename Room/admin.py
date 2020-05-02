from django.contrib import admin
from .models import Room


class RoomAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'beds_number', 'floor_number')


admin.site.register(Room, RoomAdmin)
