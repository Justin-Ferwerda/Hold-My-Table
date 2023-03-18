"""style view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import EmailMessage

class EmailView(ViewSet):
    """Email views"""

    @action(methods=['post'], detail=False)
    def send_email(self, request):
        """handles save table layout for restaurant"""

        data = request.data

        email = EmailMessage(
          'Subject here',  # Email subject
          'Here is the message.',  # Email message
          'justin.ferwerda@gmail.com',  # Sender email
          [data['email']],  # List of recipient emails
        )

        email.send()

        return Response({'message': 'Email Sent!'})
