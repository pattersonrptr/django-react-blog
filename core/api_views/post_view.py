from . import *

from datetime import datetime
from rest_framework import permissions

from core.serializers import PostSerializer
from core.models.post_model import Post


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = (permissions.AllowAny,)
        else:
            permission_classes = (permissions.IsAuthenticated,)

        return [permission() for permission in permission_classes]

    # TODO Better using this logic in another place, maybe inside a post_create or overriding save method in the model
    def perform_create(self, serializer):
        publish = self.request.data.get('publish')
        published_date = datetime.now() if publish else None

        serializer.save(published_date=published_date)
