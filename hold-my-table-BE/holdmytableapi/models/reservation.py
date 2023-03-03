"""reservation model"""
from datetime import datetime
from django.db import models
from .user import User
from .table import Table

class Reservation(models.Model):
    """reservation attributes"""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_reservations')
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='table_reservations')
    date = models.DateTimeField()
    notes = models.CharField(max_length=240)
    cancellation_policy = models.CharField(max_length=240)
    guests = models.IntegerField()

    @property
    def is_past(self):
        """checks if reservation is in the past"""
        return datetime.now() > self.date
