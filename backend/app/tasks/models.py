from django.db import models

from utils.mixins import ModelToStrMixin
from app.users.models import UserProfile


class Task(ModelToStrMixin, models.Model):
    title: str = models.CharField(max_length=200)
    description: str = models.TextField()
    completed: bool = models.BooleanField(default=False)
    user: UserProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
