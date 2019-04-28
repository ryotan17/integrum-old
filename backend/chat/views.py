# from django.shortcuts import render
import django_filters
from rest_framework import viewsets

from .models import Space, IssueCategory, Issue, Message
from .serializer import (
    SpaceSerializer, IssueCategorySerializer, IssueSerializer, MessageSerializer
)


class SpaceViewSet(viewsets.ModelViewSet):
    queryset = Space.objects.all().order_by('-created_at')
    serializer_class = SpaceSerializer
    filterset_fields = ('group', 'member', )


class IssueCategoryViewSet(viewsets.ModelViewSet):
    queryset = IssueCategory.objects.all().order_by('-created_at')
    serializer_class = IssueCategorySerializer


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all().order_by('-created_at')
    serializer_class = IssueSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-created_at')
    serializer_class = MessageSerializer
    filterset_fields = ('author', 'space', )
