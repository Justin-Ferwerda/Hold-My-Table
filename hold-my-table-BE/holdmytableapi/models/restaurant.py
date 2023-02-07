"""restaurant model"""
from django.db import models
from .user import User
from .style import Style

class Restaurant(models.Model):
    """restaurant attributes"""
    name = models.CharField(max_length=50)
    admin_user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    website_url = models.CharField(max_length=50)
    instagram = models.CharField(max_length=50)
    banner_pic = models.CharField(max_length=50)
    cancellation_policy = models.CharField(max_length=240)
    style = models.ForeignKey(Style, on_delete=models.CASCADE)

    @property
    def tables(self):
        """restaurant tables"""
        tables = [table for table in self.restaurant_tables.all()]
        return tables

    @property
    def images(self):
        """restaurant images"""
        images = [image for image in self.restaurant_images.all()]
        return images
