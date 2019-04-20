from rest_framework import serializers

from .models import Space, IssueCategory, Issue, Message
from account.serializer import UserSerializer


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ('id', 'group', 'title', 'description', 'created_at', 'updated_at', 'member')


class IssueCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCategory
        fields = ('id', 'group', 'name', 'created_by', 'created_at', 'updated_at')


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ('id', 'group', 'title', 'description', 'due_date', 'created_by', 'updated_by',
                  'assignee', 'category', 'priority', 'status', 'created_at', 'updated_at')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'text', 'issue', 'space', 'author', 'mention', 'created_at', 'updated_at')
    author = UserSerializer()

