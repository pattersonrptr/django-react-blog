from . import *

from core.serializers import CommentSerializer
from core.models.comment_model import Comment


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
