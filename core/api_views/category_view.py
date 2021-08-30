from . import *
from rest_framework import permissions

from core.serializers import CategorySerializer
from core.models.category_model import Category


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def get_permissions(self):
        permission_classes = (permissions.AllowAny,)
        return [permission() for permission in permission_classes]
