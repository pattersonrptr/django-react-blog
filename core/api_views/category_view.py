from . import *

from core.serializers import CategorySerializer
from core.models.category_model import Category


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
