"""user view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from holdmytableapi.models import User, UserStyle
from holdmytableapi.serializers import UserSerializer
from holdmytableapi.helpers import snake_case_to_camel_case_single, snake_case_to_camel_case_many, camel_case_to_snake_case

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

    def update(self, request, pk):
        """update user"""

        data = camel_case_to_snake_case(request.data)
        user = User.objects.get(pk=pk)

        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.email = data['email']
        user.phone = data['phone']
        user.profile_image_url = data['profile_image_url']

        for style in  UserStyle.objects.filter(user=user):
            style.delete()

        for style in request.data['styles']:
            user_style = UserStyle(
            user = user,
            style = style
            )

            user_style.save()

        user.save()

        serializer = UserSerializer(user)
        return Response(snake_case_to_camel_case_single(serializer.data))
      