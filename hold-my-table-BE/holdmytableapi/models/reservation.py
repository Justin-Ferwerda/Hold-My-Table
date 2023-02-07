"""reservation model"""
from django.db import models
from .user import User
from .table import Table

class Reservation(models.Model):
    """reservation attributes"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='table_reservations')
    date = models.DateTimeField()
    notes = models.CharField(max_length=240)
 