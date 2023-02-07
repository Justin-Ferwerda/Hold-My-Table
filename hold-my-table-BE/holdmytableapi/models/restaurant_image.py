"""restaurant_image model"""
from django.db import models
from .restaurant import Restaurant

class RestaurantImage(models.Model):
    """restaurant_image attributes"""

    url = models.CharField(max_length=100)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='restaurant_images')
