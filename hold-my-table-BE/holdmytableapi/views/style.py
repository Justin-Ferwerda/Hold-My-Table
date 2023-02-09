"""style view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from holdmytableapi.models import Style
from holdmytableapi.serializers import StyleSerializer
from holdmytableapi.helpers import snake_case_to_camel_case_many

class StyleView(ViewSet):
    """style views"""

    def list(self, request):
        """get all styles"""

        styles = Style.objects.all()

        serializer = StyleSerializer(styles, many=True)

        data = snake_case_to_camel_case_many(serializer.data)

        return Response(data)
