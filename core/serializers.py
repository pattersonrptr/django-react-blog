from rest_framework import serializers

from .models.post_model import Post
from .models.category_model import Category
from .models.comment_model import Comment
from .models.tag_model import Tag


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'created_date', 'published_date')


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name', )


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'post', 'body', )


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug', )

    def get_fields(self, *args, **kwargs):
        fields = super(TagSerializer, self).get_fields(*args, **kwargs)
        request = self.context.get('request', None)

        if request and getattr(request, 'method', None) in ['POST', 'PUT']:
            fields['slug'].required = False
        return fields

