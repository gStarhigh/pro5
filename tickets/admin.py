from django.contrib import admin
from .models import Tickets


class TicketsAdmin(admin.ModelAdmin):
    list_display = ('owner', 'updated_on', 'created_on',
                    'subject', 'message', 'ticket_status')


admin.site.register(Tickets, TicketsAdmin)
