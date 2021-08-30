from . import *
from rest_framework import permissions

from core.serializers import TagSerializer
from core.models.tag_model import Tag


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

    def get_permissions(self):
        permission_classes = (permissions.AllowAny,)
        return [permission() for permission in permission_classes]
