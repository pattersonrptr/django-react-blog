from . import *

from django.utils import timezone

from .category_model import Category
from .tag_model import Tag


class Post(models.Model):
    # author = models.ForeignKey(User, on_delete=models.CASCADE)

    # TODO category does not have to be null=True
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    tags = models.ManyToManyField(Tag)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-published_date', '-created_date']

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
