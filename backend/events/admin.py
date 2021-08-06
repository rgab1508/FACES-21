from django.contrib import admin

from .models import Event, Participation

admin.site.register(Event)
admin.site.register(Participation)