# Generated by Django 5.0.7 on 2024-07-24 06:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stockprice', '0002_indicesprice_remove_stockprice_eps_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='IndicesPrice',
        ),
    ]
