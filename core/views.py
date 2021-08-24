from rest_framework import viewsets
from datetime import datetime

from .serializers import PostSerializer
from .models import Post


# API Views

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_create(self, serializer):
        publish = self.request.data.get('publish')
        published_date = datetime.now() if publish else None

        serializer.save(published_date=published_date)
