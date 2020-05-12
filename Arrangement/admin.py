from django.contrib import admin
from .models import Arrangement


class ArrangementAdmin(admin.ModelAdmin):
    list_display = ('accommodation',)


admin.site.register(Arrangement, ArrangementAdmin)
