"""Viewset for Tables"""
from datetime import datetime, timedelta
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from holdmytableapi.models import Restaurant, Table
from holdmytableapi.serializers import TableSerializer
from holdmytableapi.helpers import snake_case_to_camel_case_many, camel_case_to_snake_case, snake_case_to_camel_case_single


class TableView(ViewSet):
    """handles table requests"""

    def retrieve(self, request, pk):
        """get single table"""

        table = Table.objects.get(pk=pk)
        serializer = TableSerializer(table)
        return Response(snake_case_to_camel_case_single(serializer.data))

    def list(self, request):
        """get multiple tables"""

        tables = Table.objects.all()
        serializer = TableSerializer(tables, many=True)
        data = snake_case_to_camel_case_many(serializer.data)
        return Response(data)

    def create(self, request):
        """handles POST requests for tables"""
        data = camel_case_to_snake_case(request.data)
        restaurant = Restaurant.objects.get(pk=data['restaurant_id'])

        table = Table.objects.create(
            restaurant = restaurant,
            capacity = int(data['capacity']),
            number = data['number'],
            reservable = data['reservable'],
            shape = data['shape'],
            x_coord = data['x_coord'],
            y_coord = data['y_coord'],
        )

        serializer = TableSerializer(table)
        return Response(serializer.data)

    def update(self, request, pk):
        """handles update requests for tables"""
        data = camel_case_to_snake_case(request.data)
        restaurant = Restaurant.objects.get(pk=data['restaurant'])
        table = Table.objects.get(pk=pk)

        table.restaurant = restaurant
        table.number = data['number']
        table.capacity = data['capacity']
        table.shape = data['shape']
        table.is_reserved = data['is_reserved']
        table.x_coord = data['x_coord']
        table.y_coord = data['y_coord']
        table.reservable = data['reservable']

        table.save()
        serializer = TableSerializer(table)
        return Response(snake_case_to_camel_case_single(serializer.data))


    def destroy(self, request, pk):
        """handles DELETE requests for tables"""

        table = Table.objects.get(pk=pk)
        table.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)

    @action(methods=['put'], detail=False)
    def save_tables(self, request):
        """handles save table layout for restaurant"""
        table_ids = request.data.keys()

        for table_id in table_ids:
            table_to_save = Table.objects.get(pk=table_id)
            coords = request.data.get(table_id)

            table_to_save.x_coord = coords['x']
            table_to_save.y_coord = coords['y']

            table_to_save.save()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post'], detail=False)
    def check_if_reserved(self, request):
        """checks if table is reserved and sets reserved tables"""
        time = request.data['time']
        date = request.data['date']
        table_ids = request.data['tables']

        year, month, day = date.split('-')
        hour, minutes, seconds = time.split(':')

        request_date = datetime(int(year), int(month), int(day), int(hour), int(minutes), int(seconds))

        tables = []

        for table_id in table_ids:
            table = Table.objects.get(pk=table_id)
            reservations = table.table_reservations.all()
            for res in reservations:
                date, time = str(res.date).split(' ')

                year, month, day = date.split('-')
                hour, minutes, seconds, _ = time[:-1].split(':')

                secs, _ = seconds.split('+')

                res_date = datetime(int(year), int(month), int(day), int(hour), int(minutes), int(secs))

                diff_1 = request_date - res_date
                diff_2 = res_date - request_date

                if diff_1 <= timedelta(minutes=90) or diff_2 <= timedelta(minutes=90):
                    table.reserved = True

                else:
                    table.reserved = False


            tables.append(table)

        serializer = TableSerializer(tables, many=True)


        return Response(serializer.data)
