"""user view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from holdmytableapi.models import User
from holdmytableapi.serializers import UserSerializer
from holdmytableapi.helpers import snake_case_to_camel_case_single, snake_case_to_camel_case_many

class UserView(ViewSet):
    """user views"""

    def retrieve(self, request, pk):
        """get single user"""
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return Response(snake_case_to_camel_case_single(serializer.data))

    def list(self, request):
        """get all users"""
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(snake_case_to_camel_case_many(serializer.data))
