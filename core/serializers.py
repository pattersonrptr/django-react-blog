from rest_framework import serializers

from .models import Post
from .models import Category
from .models import Comment
from .models import Tag


class PostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'created_date', 'published_date')


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('name', )


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('name', )


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('name', )

