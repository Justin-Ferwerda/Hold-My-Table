"""reservation view"""
from datetime import datetime
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
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
        converted_date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")

        reservation = Reservation()

        reservation.user = user
        reservation.table = table
        reservation.date = converted_date
        reservation.notes = data['notes']
        reservation.cancellation_policy = data['policy']
        reservation.guests = data['guest_value']

        reservation.save()

        email = EmailMessage(
          'Reservation Confirmation',  # Email subject
          f'Your reservation at {table.restaurant.name} on {reservation.date} is confirmed',  # Email message
          'holdmytablenashville@gmail.com',  # Sender email
          [user.email],  # List of recipient emails
        )

        email.send()

        serializer = ReservationSerializer(reservation)
        return Response(snake_case_to_camel_case_single(serializer.data))

    def destroy(self, request, pk):
        """ handles delete requests for reservations"""

        restaurant = Reservation.objects.get(pk=pk)
        restaurant.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)
