from rest_framework import serializers

from .models import Group, User


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'created_at', 'updated_at')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'group', 'email', 'username', 'is_staff', 'is_active', 'date_joined',
                  'is_manager', 'photo')
    group = GroupSerializer()
