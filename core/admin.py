from django.contrib import admin

from .models import Post
from .models import Comment
from .models import Category
from .models import Tag


class PostAdmin(admin.ModelAdmin):
    fields = ('title', 'text', 'created_date', 'published_date')


class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'body', 'post', 'created_on', 'active')
    list_filter = ('active', 'created_on')
    search_fields = ('name', 'email', 'body')
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(active=True)


class CategoryAdmin(admin.ModelAdmin):
    fields = ('name', )


class TagAdmin(admin.ModelAdmin):
    fields = ('name', )


admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag, TagAdmin)


