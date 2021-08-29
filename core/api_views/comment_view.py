from . import *

from core.serializers import CommentSerializer
from core.models.comment_model import Comment


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        post_id = self.request.query_params.get('post_id')
        queryset = Comment.objects.filter(post_id=post_id)

        return queryset
