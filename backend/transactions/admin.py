from django.contrib import admin
from .models import IssueRecord, Fine, Reservation

admin.site.register(IssueRecord)
admin.site.register(Fine)
admin.site.register(Reservation)
