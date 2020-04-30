from django.contrib import admin
from .models import RoomCollection


class RoomCollectionAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'bed_numbers', 'floor_number')


admin.site.register(RoomCollection, RoomCollectionAdmin)

