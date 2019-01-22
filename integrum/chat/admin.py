from django.contrib import admin
from .models import Space, IssueCategory, Issue, Message

@admin.register(Space)
class Space(admin.ModelAdmin):
    pass


@admin.register(IssueCategory)
class IssueCategory(admin.ModelAdmin):
    pass


@admin.register(Issue)
class Issue(admin.ModelAdmin):
    pass


@admin.register(Message)
class Message(admin.ModelAdmin):
    pass
