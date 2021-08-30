from . import *
from rest_framework import permissions

from core.serializers import CommentSerializer
from core.models.comment_model import Comment


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_permissions(self):
        permission_classes = (permissions.AllowAny,)
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        post_id = self.request.query_params.get('post_id')
        queryset = Comment.objects.all()

        if post_id:
            queryset = queryset.filter(post_id=post_id)

        return queryset
