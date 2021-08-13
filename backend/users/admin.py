from django.contrib import admin

from .models import User, Team


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
  list_filter = ('is_phone_no_verified', 'has_filled_profile') #'money_owed')
  search_fields = ('roll_no', 'name', 'email', 'phone_no')

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
  search_fields = ('team_code', 'team_name')