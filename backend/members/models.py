from django.db import models
from django.conf import settings


class Member(models.Model):
    class MembershipType(models.TextChoices):
        STUDENT = 'STUDENT', 'Student'
        FACULTY = 'FACULTY', 'Faculty'
        GENERAL = 'GENERAL', 'General'

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='member_profile')
    membership_type = models.CharField(max_length=20, choices=MembershipType.choices, default=MembershipType.STUDENT)
    join_date = models.DateField(auto_now_add=True)
    address = models.TextField(blank=True)
    max_books_allowed = models.PositiveIntegerField(default=3)

    def __str__(self):
        return f"{self.user.username} - {self.membership_type}"
