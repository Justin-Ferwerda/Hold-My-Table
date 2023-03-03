"""user model"""
from datetime import datetime
from django.db import models

class User(models.Model):
    """user attributes"""

    uid = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    profile_image_url = models.CharField(max_length=100)

    @property
    def styles(self):
        """user styles"""

        styles = [style for style in self.user_styles.all()]
        return styles

    @property
    def reservations(self):
        """user reservations"""
        reservations = [res for res in self.user_reservations.all() if datetime.now() < res.date]
        if len(reservations):
            return reservations

    @property
    def past_reservations(self):
        """past reservations"""
        reservations = [res for res in self.user_reservations.all() if datetime.now() > res.date]
        if len(reservations):
            return reservations

    @property
    def admin(self):
        """checks if user is an admin of any restaurants"""
        restaurants = [res for res in self.restaurant_admin.all()]
        if len(restaurants):
            admin = True
        else:
            admin = False

        return admin

    @property
    def admin_restaurant(self):
        """gets admin restaurant"""
        restaurant = [res for res in self.restaurant_admin.all()]
        if len(restaurant):
            return restaurant.pop(0)
