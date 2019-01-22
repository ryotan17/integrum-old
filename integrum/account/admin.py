from django.contrib import admin
from .models import Group, User

@admin.register(Group)
class Group(admin.ModelAdmin):
    pass


@admin.register(User)
class User(admin.ModelAdmin):
    pass

