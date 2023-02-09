"""auth view"""
from rest_framework.decorators import api_view
from rest_framework.response import Response
from holdmytableapi.models import User, UserStyle, Style
from holdmytableapi.serializers import UserSerializer
from holdmytableapi.helpers import snake_case_to_camel_case_single


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
    user = User.objects.create(
        uid=request.data['uid'],
        first_name=request.data['first_name'],
        last_name=request.data['last_name'],
        email = request.data['email'],
        phone = request.data['phone'],
        profile_image_url = request.data['profile_image_url']
    )

    for style in request.data['styles']:
        genre = Style.objects.get(pk=style.value)
        user_style = UserStyle(
        user = user,
        style = genre
        )

        user_style.save()


    new_user = User.objects.get(uid=user.uid)

    serializer = UserSerializer(new_user)
    return Response(snake_case_to_camel_case_single(serializer.data))
