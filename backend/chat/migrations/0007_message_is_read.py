# Generated by Django 2.1.5 on 2019-04-28 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_message_parent_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='is_read',
            field=models.BooleanField(default=False, verbose_name='is read'),
        ),
    ]
