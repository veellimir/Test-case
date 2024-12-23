from django.contrib.auth.models import User
from django.db import models

from utils.mixins import ModelToStrMixin


class UserProfile(ModelToStrMixin, models.Model):
    user: User = models.OneToOneField(User, on_delete=models.CASCADE)
    working_position: str = models.TextField(blank=True, null=True)
