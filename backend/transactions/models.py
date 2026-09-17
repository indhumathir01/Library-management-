from django.db import models
from django.utils import timezone
from datetime import timedelta
from books.models import Book
from members.models import Member

FINE_PER_DAY = 5  # currency units per day overdue
LOAN_PERIOD_DAYS = 14


class IssueRecord(models.Model):
    class Status(models.TextChoices):
        ISSUED = 'ISSUED', 'Issued'
        RETURNED = 'RETURNED', 'Returned'
        OVERDUE = 'OVERDUE', 'Overdue'

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='issue_records')
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='issue_records')
    issue_date = models.DateField(default=timezone.now)
    due_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ISSUED)

    def save(self, *args, **kwargs):
        if not self.due_date:
            self.due_date = timezone.now().date() + timedelta(days=LOAN_PERIOD_DAYS)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.book.title} -> {self.member.user.username}"


class Fine(models.Model):
    issue_record = models.OneToOneField(IssueRecord, on_delete=models.CASCADE, related_name='fine')
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    paid = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Fine {self.amount} for {self.issue_record}"


class Reservation(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active'
        FULFILLED = 'FULFILLED', 'Fulfilled'
        CANCELLED = 'CANCELLED', 'Cancelled'

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reservations')
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='reservations')
    reserved_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)

    def __str__(self):
        return f"{self.book.title} reserved by {self.member.user.username}"
