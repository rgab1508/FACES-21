from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
  filter_fields = ('verified')
  search_fields = ('transaction_id', 'transaction_code')