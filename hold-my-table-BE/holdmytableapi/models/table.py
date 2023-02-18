"""table model"""
from django.db import models
from .restaurant import Restaurant

class Table(models.Model):
    """table attributes"""

    number = models.IntegerField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='tables')
    capacity = models.IntegerField()
    shape = models.CharField(max_length=25)
    is_reserved = models.BooleanField()
    x_coord = models.FloatField()
    y_coord = models.FloatField()
    reservable = models.BooleanField()

    @property
    def reservations(self):
        """table reservations"""
        reservations = [res for res in self.table_reservations.all()]
        return reservations

    @property
    def reviews(self):
        """table reviews"""
        reviews = [review for review in self.table_reviews.all()]
        return reviews

    @property
    def rating(self):
        """gets rating for table"""
        reviews = [review for review in self.table_reviews.all()]
        ratings = [review.rating for review in reviews]
        if len(ratings):
            avg = sum(ratings)/len(ratings)
            rating = round(avg*2)/2
            return rating
        else:
            return 0
