"""Viewset for Reviews"""
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from holdmytableapi.models import User, Table, Review
from holdmytableapi.serializers import ReviewSerializer
from holdmytableapi.helpers import camel_case_to_snake_case, snake_case_to_camel_case_single

class ReviewView(ViewSet):
    """handles review requests"""

    def create(self, request):
        """handles POST requests for reviews"""
        data = camel_case_to_snake_case(request.data)
        table = Table.objects.get(pk=data['table'])
        user = User.objects.get(pk=data['user'])

        review = Review.objects.create(
            table = table,
            user = user,
            rating = data['rating'],
            content = data['content'],
            image_url = data['image_url'],
        )

        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def update(self, request, pk):
        """handles update requests for reviews"""
        data = camel_case_to_snake_case(request.data)
        review = Review.objects.get(pk=pk)

        review.content = data['content']
        review.rating = data['rating']

        review.save()
        serializer = ReviewSerializer(review)
        return Response(snake_case_to_camel_case_single(serializer.data))


    def destroy(self, request, pk):
        """handles DELETE requests for reviews"""

        review = Review.objects.get(pk=pk)
        review.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)
