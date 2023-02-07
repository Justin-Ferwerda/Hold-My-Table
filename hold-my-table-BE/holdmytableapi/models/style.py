"""restaurant model"""
from django.db import models

class Style(models.Model):
    """style attributes"""

    label = models.CharField(max_length=50)
 