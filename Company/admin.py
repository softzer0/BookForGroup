from django.contrib import admin
from .models import CompanyUser


class CompanyAdmin(admin.ModelAdmin):
    list_display = ('user', 'pib', 'city', 'address')


admin.site.register(CompanyUser, CompanyAdmin)
