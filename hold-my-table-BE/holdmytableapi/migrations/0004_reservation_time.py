# Generated by Django 4.1.6 on 2023-02-20 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('holdmytableapi', '0003_restaurant_bio'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='time',
            field=models.TimeField(default='7:30 PM'),
            preserve_default=False,
        ),
    ]
