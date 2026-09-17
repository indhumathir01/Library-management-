from rest_framework import serializers
from .models import IssueRecord, Fine, Reservation


class IssueRecordSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    member_name = serializers.CharField(source='member.user.username', read_only=True)

    class Meta:
        model = IssueRecord
        fields = ['id', 'book', 'book_title', 'member', 'member_name',
                  'issue_date', 'due_date', 'return_date', 'status']


class FineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fine
        fields = ['id', 'issue_record', 'amount', 'paid', 'created_on']


class ReservationSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    member_name = serializers.CharField(source='member.user.username', read_only=True)

    class Meta:
        model = Reservation
        fields = ['id', 'book', 'book_title', 'member', 'member_name', 'reserved_date', 'status']
