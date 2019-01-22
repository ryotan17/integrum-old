from rest_framework import serializers

from accout.models import Group, User
from .models import Space, IssueCategory, Issue, Message

class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ('id', 'group', 'title', 'description', 'created_at', 'member')


