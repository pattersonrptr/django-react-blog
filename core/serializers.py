from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'created_date', 'published_date')
    #
    # def save(self):
    #
    #     print(">>", self.context.get("request").data)
    #
    #     publish = self.context.get("request").data.get('publish')
    #
    #     print(">>", publish)
    #
    #     if publish:
    #         from datetime import datetime
    #         published_date = datetime.now()

    # def save(self):
    #     title = self.validated_data['title']
    #     text = self.validated_data['text']
