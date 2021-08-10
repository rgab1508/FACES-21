from django.contrib import admin

from .models import User, Team


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
  list_filter = ('is_phone_no_verified',) #'money_owed')

admin.site.register(Team)