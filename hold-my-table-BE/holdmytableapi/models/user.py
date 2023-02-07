"""user model"""
from django.db import models

class User(models.Model):
    """user attributes"""

    uid = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    profile_image_url = models.CharField(max_length=100)
    