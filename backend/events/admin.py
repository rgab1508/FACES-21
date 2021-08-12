from django.contrib import admin
from django.db.models import F

from .models import Event

class SeatsFilterList(admin.SimpleListFilter):

    title = 'Seats'
    parameter_name = 'seats'

    def lookups(self, request, model_admin):
        
        return (
            ('FULL', 'Seats Full'),
            ('VACENT', 'Seats Vacent'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'FULL':
            return queryset.filter(seats=F('max_seats'))
        if self.value() == 'VACENT':
            return queryset.filter(seats__lte=F('max_seats'))

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
  list_filter = ('day', 'category', SeatsFilterList)
  search_fields = ('event_code', 'title', 'desciption', )
