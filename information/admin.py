from django.contrib import admin
from .models import Information


class InformationAdmin(admin.ModelAdmin):
    list_display = ('owner', 'created_on', 'start_date', 'end_date', 'text',)


admin.site.register(Information, InformationAdmin)
