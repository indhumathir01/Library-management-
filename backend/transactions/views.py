from datetime import date
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from .models import IssueRecord, Fine, Reservation, FINE_PER_DAY
from .serializers import IssueRecordSerializer, FineSerializer, ReservationSerializer
from books.models import Book


class IssueRecordViewSet(viewsets.ModelViewSet):
    queryset = IssueRecord.objects.all().order_by('-issue_date')
    serializer_class = IssueRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        book = serializer.validated_data['book']
        if book.available_copies < 1:
            raise ValueError("No copies available")
        book.available_copies -= 1
        book.save()
        serializer.save()

    @action(detail=True, methods=['post'])
    def return_book(self, request, pk=None):
        record = self.get_object()
        if record.status == IssueRecord.Status.RETURNED:
            return Response({'detail': 'Already returned'}, status=status.HTTP_400_BAD_REQUEST)

        record.return_date = timezone.now().date()
        record.status = IssueRecord.Status.RETURNED
        record.save()

        record.book.available_copies += 1
        record.book.save()

        if record.return_date > record.due_date:
            overdue_days = (record.return_date - record.due_date).days
            Fine.objects.create(issue_record=record, amount=overdue_days * FINE_PER_DAY)

        return Response(IssueRecordSerializer(record).data)


class FineViewSet(viewsets.ModelViewSet):
    queryset = Fine.objects.all()
    serializer_class = FineSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all().order_by('-reserved_date')
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]
