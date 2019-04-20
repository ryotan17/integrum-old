from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from account.models import Group, User


class Space(models.Model):
    group = models.ForeignKey(Group, on_delete=models.PROTECT)
    title = models.CharField(_('title'), max_length=100)
    description = models.CharField(_('description'), max_length=100)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    member = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return str(self.group) + '_' + self.title


class IssueCategory(models.Model):
    group = models.ForeignKey(Group, on_delete=models.PROTECT)
    name = models.CharField(_('category name'), max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    def __str__(self):
        return str(self.group) + '_' + self.name


class Issue(models.Model):
    PRIORITY_CHOICES = (
        ('Hign', 'High'),
        ('Normal', 'Normal'),
        ('Low', 'Low'),
    )
    STATUS_CHOICES = (
        ('Open', 'Open'),
        ('InProgress', 'InProgress'),
        ('Closed', 'Closed'),
    )
    group = models.ForeignKey(Group, on_delete=models.PROTECT)
    title = models.CharField(_('title'), max_length=100)
    description = models.TextField(_('description'), blank=True, null=True)
    due_date = models.DateTimeField(_('due_date'), blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='issues_created')
    updated_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='issues_updated')
    assignee = models.ForeignKey(User, on_delete=models.PROTECT, related_name='issues_assigned')
    category = models.ManyToManyField(IssueCategory, blank=True)
    priority = models.CharField(max_length=1, choices=PRIORITY_CHOICES, blank=True, null=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    def __str__(self):
        return str(self.group) + '_' + str(self.id) + '_' + self.title


class Message(models.Model):
    text = models.TextField(_('text'))
    issue = models.ForeignKey(Issue, on_delete=models.PROTECT, blank=True, null=True)
    space = models.ForeignKey(Space, on_delete=models.PROTECT)
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name='messages_author')
    mention = models.ManyToManyField(User, blank=True, related_name='massages_mention')
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    parent_message = models.ForeignKey('self', on_delete=models.PROTECT, blank=True, null=True)

    def __str__(self):
        return str(self.space) + '_' + str(self.author) + '_' + str(self.id)

