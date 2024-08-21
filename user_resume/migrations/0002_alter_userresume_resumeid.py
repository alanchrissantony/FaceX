# Generated by Django 5.0.7 on 2024-07-24 22:35

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_resume', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userresume',
            name='resumeId',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
