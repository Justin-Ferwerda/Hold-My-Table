"""user_style model"""
from django.db import models
from .user import User
from .style import Style

class UserStyle(models.Model):
    """user_style attributes"""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_styles')
    style = models.ForeignKey(Style, on_delete=models.CASCADE)
    