"""serializers"""
from rest_framework.serializers import ModelSerializer
from holdmytableapi.models import User, Reservation, Restaurant, RestaurantImage, Table, UserStyle, Review, Style

class StyleSerializer(ModelSerializer):
    """style serializer"""

    class Meta:
        """fields"""
        model = Style
        fields = ('id', 'label')

class UserStyleSerializer(ModelSerializer):
    """user style serializer"""

    class Meta:
        """fields"""
        model = UserStyle
        fields = ('id', 'user', 'style')
        depth = 1

class ReservationSerializer(ModelSerializer):
    """reservation serializer"""

    class Meta:
        """fields"""
        model = Reservation
        fields = ('id', 'user', 'table', 'date', 'notes', 'guests')
        depth = 2
        
class UserSerializer(ModelSerializer):
    """user serializer"""

    styles = UserStyleSerializer(many=True)
    reservations = ReservationSerializer(many=True)

    class Meta:
        """fields"""
        model = User
        fields = ('id', 'uid', 'first_name', 'last_name', 'email', 'phone', 'profile_image_url', 'styles', 'reservations')
        depth = 1

class ReviewSerializer(ModelSerializer):
    """review serializer"""

    class Meta:
        """fields"""
        model = Review
        fields = ('id', 'user', 'table', 'rating', 'content', 'image_url')
        depth = 1

class TableSerializer(ModelSerializer):
    """table serializer"""

    reservations = ReservationSerializer(many=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        """fields"""
        model = Table
        fields = ('id', 'reserved', 'restaurant', 'number', 'capacity', 'shape', 'x_coord', 'y_coord', 'reservable', 'reservations', 'reviews', 'rating',)
        depth = 1

class RestaurantImageSerializer(ModelSerializer):
    """image serializer"""

    class Meta:
        """fields"""
        model = RestaurantImage
        fields = ('id', 'url', 'restaurant')
        depth = 1

class RestaurantSerializer(ModelSerializer):
    """restaurant serializer"""

    tables = TableSerializer(many=True)
    images = RestaurantImageSerializer(many=True)

    class Meta:
        """fields"""
        model = Restaurant
        fields = ('id', 'name', 'admin_user', 'email', 'phone_number', 'address', 'website_url', 'instagram', 'banner_pic',
        'rating', 'cancellation_policy', 'style', 'tables', 'images', 'price_tier', 'bio')
        depth = 1
