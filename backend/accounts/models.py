from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        LIBRARIAN = 'LIBRARIAN', 'Librarian'
        MEMBER = 'MEMBER', 'Member'

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.MEMBER)
    phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
