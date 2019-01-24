from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from account.models import Group, User


class Space(models.Model):
    group = models.ForeignKey(Group, on_delete=models.PROTECT)
    title = models.CharField(_('title'), max_length=100)
    description = models.CharField(_('description'), max_length=100)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    member = models.ManyToManyField(User, blank=True)


class IssueCategory(models.Model):
    group = models.ForeignKey(Group, on_delete=models.PROTECT)
    name = models.CharField(_('category name'), max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)


class Issue(models.Model):
    PRIORITY_CHOICES = (
        ('H', 'High'),
        ('N', 'Normal'),
        ('L', 'Low'),
    )
    STATUS_CHOICES = (
        ('O', 'Open'),
        ('I', 'InProgress'),
        ('C', 'Closed'),
    )
    group = models.ForeignKey(Group, on_delete=models.PROTECT)
    due_date = models.DateTimeField(_('due_date'))
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='issues_created')
    updated_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='issues_updated')
    assignee = models.ForeignKey(User, on_delete=models.PROTECT, related_name='issues_assigned')
    category = models.ManyToManyField(IssueCategory, blank=True)
    priority = models.CharField(max_length=1, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)


class Message(models.Model):
    text = models.TextField(_('text'))
    issue = models.ForeignKey(Issue, on_delete=models.PROTECT, blank=True)
    space = models.ForeignKey(Space, on_delete=models.PROTECT)
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name='messages_author')
    mention = models.ManyToManyField(User, blank=True, related_name='massages_mention')
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

