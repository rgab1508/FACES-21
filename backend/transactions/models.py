
from django.db import models
from uuid import uuid4
from users.models import User, Team
from events.models import Event
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _



class Transaction(models.Model):
  
  transaction_code = models.CharField(_("Transaction Code"), max_length=36,default=uuid4, unique=True)
  transaction_id = models.CharField(_("Transactions Id"), max_length=36)
  amount = models.DecimalField(_("Amount"),decimal_places=2,max_digits=10, default=0.00)
  events = models.ManyToManyField(Event, related_name="transactions")
  user = models.ForeignKey(User, related_name="transactions", on_delete=models.CASCADE)
  teams = models.ManyToManyField(Team, related_name="transactions")
  verified = models.BooleanField(_("Verified"), default=False)
  timestamp = models.DateTimeField(_("Timestamp"), default=timezone.now)

  def __str__(self) -> str:
      return f"{self.transaction_code}"