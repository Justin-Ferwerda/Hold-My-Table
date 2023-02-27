"""auth view"""
from rest_framework.decorators import api_view
from rest_framework.response import Response
from holdmytableapi.models import User, UserStyle, Style
from holdmytableapi.serializers import UserSerializer
from holdmytableapi.helpers import snake_case_to_camel_case_single, camel_case_to_snake_case


@api_view(['POST'])
def check_user(request):
    '''Checks to see if User has Associated User

    Method arguments:
      request -- The full HTTP request object
    '''

    uid = request.data['uid']

    try:
        user = User.objects.get(uid=uid)

        serializer = UserSerializer(user)
        return Response(snake_case_to_camel_case_single(serializer.data))
    except:
        data = { 'valid': False }
        return Response(data)

@api_view(['POST'])
def register_user(request):
    '''Handles the creation of a new user for authentication

    Method arguments:
      request -- The full HTTP request object
    '''
    data = camel_case_to_snake_case(request.data)

    user = User.objects.create(
        uid=data['uid'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        email = data['email'],
        phone = data['phone'],
        profile_image_url = data['profile_image_url']
    )

    for style in data['styles']:
        genre = Style.objects.get(pk=style.value)
        user_style = UserStyle(
        user = user,
        style = genre
        )

        user_style.save()


    new_user = User.objects.get(uid=user.uid)

    serializer = UserSerializer(new_user)
    return Response(snake_case_to_camel_case_single(serializer.data))
