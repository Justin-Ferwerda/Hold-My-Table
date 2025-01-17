"""restaurant view"""

from datetime import datetime
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from holdmytableapi.models import User, Restaurant, Style, Table
from holdmytableapi.serializers import RestaurantSerializer, TableSerializer
from holdmytableapi.helpers import snake_case_to_camel_case_many, camel_case_to_snake_case, snake_case_to_camel_case_single, check_if_reserved

class RestaurantView(ViewSet):
    """restaurant views"""

    def retrieve(self, request, pk):
        """get single restaurant"""

        restaurant = Restaurant.objects.get(pk=pk)
        date = request.query_params.get('date')
        time = request.query_params.get('time')
        table_ids = restaurant.tables.values_list('id', flat=True)
        res_tables = Table.objects.filter(id__in = table_ids)

        if date and time is not None:

            year, month, day = date.split('-')
            hour, minutes, seconds = time.split(':')

            request_date = datetime(int(year), int(month), int(day), int(hour), int(minutes), int(seconds))

            if datetime.now() >= request_date:
                return Response({'message': 'Please Pick a a Date in the Future!'}, status.HTTP_403_FORBIDDEN)

            else:
                res_tables = check_if_reserved(res_tables, request_date)

        data = {}
        table_serializer = TableSerializer(res_tables, many=True)
        serializer = RestaurantSerializer(restaurant)
        data = serializer.data
        data['tables'] = table_serializer.data
        return Response(snake_case_to_camel_case_single(data))


    def list(self, request):
        """get multiple restaurants"""

        restaurants = Restaurant.objects.all()
        res_city = request.query_params.get('city')
        if res_city is not None:
            restaurants = [restaurant for restaurant in restaurants if res_city in restaurant.address]

        serializer = RestaurantSerializer(restaurants, many=True)
        data = snake_case_to_camel_case_many(serializer.data)
        return Response(data)

    def create(self, request):
        """handles POST request for restaurants"""
        print(request.data)
        data = camel_case_to_snake_case(request.data)
        admin_user = User.objects.get(pk=data['admin_user'])
        style = Style.objects.get(pk=data['style'])

        restaurant = Restaurant.objects.create(
            admin_user = admin_user,
            name = data['name'],
            email = data['email'],
            phone_number = data['phone_number'],
            address = data
            ['address'],
            website_url = data['website_url'],
            instagram = data['instagram'],
            banner_pic = data['banner_pic'],
            cancellation_policy = data['cancellation_policy'],
            price_tier = data['price_tier'],
            style = style,
        )

        serializer = RestaurantSerializer(restaurant)
        return Response(snake_case_to_camel_case_single(serializer.data))

    def update(self, request, pk):
        """handles update request for restaurants"""
        data = camel_case_to_snake_case(request.data)
        style = Style.objects.get(pk=data['style'])
        restaurant = Restaurant.objects.get(pk=pk)

        restaurant.name = data['name']
        restaurant.email = data['email']
        restaurant.phone_number = data['phone_number']
        restaurant.address = data['address']
        restaurant.website_url = data['website_url']
        restaurant.instagram = data['instagram']
        restaurant.banner_pic = data['banner_pic']
        restaurant.cancellation_policy = data['cancellation_policy']
        restaurant.bio = data['bio']
        restaurant.style = style

        restaurant.save()
        serializer = RestaurantSerializer(restaurant)
        return Response(snake_case_to_camel_case_single(serializer.data))

    def destroy(self, request, pk):
        """ handles delete requests for restaurant"""

        restaurant = Restaurant.objects.get(pk=pk)
        restaurant.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)
