from django.shortcuts import render
import django_filters
from rest_framework import viewsets, filters

from .models import Group, User
from .serializer import GroupSerializer, UserSerializer

from rest_framework.decorators import api_view

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('-created_at')
    serializer_class = GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

