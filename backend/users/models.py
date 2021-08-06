from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from .managers import UserManager





class User(AbstractBaseUser, PermissionsMixin):
  DEPARTMENTS = (
    ("COMP", "Computer"),
    ("IT", "IT"),
    ("EXTC", "EXTC"),
    ("MECH", "Mechanical"),
    ("ELEC", "Electrical"),
    ("OTHER", "Other")
  )
  roll_no = models.IntegerField(_("Roll Number"),unique=True, blank=False)
  email = models.EmailField(_('email address'),unique=True, max_length=254)
  name = models.CharField(_('Name'), max_length=256, blank=False)
  department = models.CharField(_('Department'),max_length=10, choices=DEPARTMENTS, blank=False)
  semester = models.SmallIntegerField(_("Semester"), blank=False)
  phone_no = models.CharField(_("Phone Number"), blank=False, unique=True, max_length=10)
  
  money_owed = models.DecimalField(_("Money Owed"),decimal_places=2,max_digits=10, default=0.00)
  has_filled_profile = models.BooleanField(_("Has Filled Profile"), default=False)

  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  date_joined = models.DateTimeField(default=timezone.now)

  USERNAME_FIELD = 'roll_no'
  REQUIRED_FIELDS = ['email', 'name', 'department', 'semester', 'phone_no']

  objects = UserManager()

  def __str__(self) -> str:
      return f"{self.roll_no}#{self.email}"


class Team(models.Model):
  team_code = models.CharField(_("Team Code"), max_length=6,unique=True, blank=False)
  team_name = models.CharField(_("Team Name"), max_length=256,blank=False)
  members = models.ManyToManyField(User, related_name='teams')

  def __str__(self) -> str:
    return f"{self.team_name}#{self.team_code}"