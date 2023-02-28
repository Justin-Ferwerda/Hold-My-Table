"""reservation view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from holdmytableapi.models import User, Reservation, Table
from holdmytableapi.serializers import ReservationSerializer
from holdmytableapi.helpers import snake_case_to_camel_case_many, camel_case_to_snake_case, snake_case_to_camel_case_single

class ReservationView(ViewSet):
    """reservation views"""

    def retrieve(self, request, pk):
        """get single restaurant"""

        reservation = Reservation.objects.get(pk=pk)
        serializer = ReservationSerializer(reservation)
        return Response(snake_case_to_camel_case_single(serializer.data))

    def list(self, request):
        """get multiple reservations"""

        reservations = Reservation.objects.all()

        serializer = ReservationSerializer(reservations, many=True)
        data = snake_case_to_camel_case_many(serializer.data)
        return Response(data)

    def create(self, request):
        """handles POST request for reservations"""

        data = camel_case_to_snake_case(request.data)
        user = User.objects.get(pk=data['user'])
        table = Table.objects.get(pk=data['table'])

        date = str(data['date_value'] + ' ' + data['time_value'])

        reservation = Reservation.objects.create(
            user = user,
            table = table,
            date = date,
            notes = data['notes'],
            cancellation_policy = data['policy'],
            guests = data['guest_value'],
        )

        serializer = ReservationSerializer(reservation)
        return Response(snake_case_to_camel_case_single(serializer.data))

    def destroy(self, request, pk):
        """ handles delete requests for reservations"""

        restaurant = Reservation.objects.get(pk=pk)
        restaurant.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)
