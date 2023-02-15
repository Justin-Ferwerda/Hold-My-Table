"""Viewset for Tables"""
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
        tables = request.data['tables']

        for table in tables:
            table_to_save = Table.objects.get(pk=table['id'])

            table_to_save.x_coord = table['x_coord']
            table_to_save.y_coord = table['y_coord']

            table_to_save.save()

        return Response(None, status=status.HTTP_204_NO_CONTENT)
