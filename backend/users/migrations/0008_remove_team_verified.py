# Generated by Django 3.2.6 on 2021-08-13 20:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_user_cart'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='verified',
        ),
    ]
