from rest_framework import serializers
from .models import Member


class MemberSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Member
        fields = ['id', 'user', 'username', 'email', 'membership_type',
                  'join_date', 'address', 'max_books_allowed']
