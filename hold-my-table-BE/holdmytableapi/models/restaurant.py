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
    price_tier = models.CharField(max_length=4)
    bio = models.CharField(max_length=500)

    # @property
    # def tables(self):
    #     """restaurant tables"""
    #     _tables = [table for table in self.tables.all()]
    #     return _tables

    # @tables.setter
    # def tables(self, value):
    #     self._tables = value

    @property
    def images(self):
        """restaurant images"""
        images = [image for image in self.restaurant_images.all()]
        return images

    @property
    def rating(self):
        """gets rating for restaurant"""
        tables = [table for table in self.tables.all()]
        reviews = [review for table in tables for review in table.reviews]
        ratings = [review.rating for review in reviews]
        if len(ratings):
            avg = sum(ratings)/len(ratings)
            rating = round(avg*2)/2
            return rating
        else:
            return 0
