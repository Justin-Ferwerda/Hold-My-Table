# Generated by Django 4.1.6 on 2023-03-02 15:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('holdmytableapi', '0008_remove_table__reserved'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='image_url',
        ),
        migrations.AddField(
            model_name='review',
            name='image',
            field=models.ImageField(null=True, upload_to=None),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='admin_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_admin', to='holdmytableapi.user'),
        ),
    ]
