from . import *

from core.serializers import TagSerializer
from core.models.tag_model import Tag


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
