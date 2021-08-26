from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime

from .serializers import PostSerializer
from .serializers import CategorySerializer
from .serializers import CommentSerializer
from .serializers import TagSerializer
from .models import Post
from .models import Category
from .models import Comment
from .models import Tag


# API Views
class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_create(self, serializer):
        publish = self.request.data.get('publish')
        published_date = datetime.now() if publish else None

        serializer.save(published_date=published_date)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

