# Generated by Django 3.2.22 on 2023-10-18 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_alter_post_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(max_length=255),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(default='../default_image', upload_to='images/'),
        ),
    ]
