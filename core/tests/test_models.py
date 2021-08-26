from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory

from ..models import Post
from ..models import Category
from ..models import Comment
from ..models import Tag
from ..views import PostViewSet
from ..views import CategoryViewSet
from ..views import CommentViewSet
from ..views import TagViewSet


class PostAPITest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=True)
        self.view = PostViewSet.as_view({'get': 'retrieve'})

    def test_can_create_a_post(self):
        url = reverse('post-list')
        data = {'title': 'Test Post', 'text': 'Test content'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, 'Test Post')
        self.assertEqual(Post.objects.get().text, 'Test content')

    def test_can_update_a_post(self):
        url = reverse('post-list')
        data = {'title': 'Test Post', 'text': 'Test content'}
        response = self.client.post(url, data, format='json')

        data = {'id': response.data['id'], 'title': 'Test Post', 'text': 'New content'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['text'], 'New content')

    def test_can_list_posts(self):
        url = reverse('post-list')

        for i in range(1, 6):
            data = {'title': f'Test Post {i}', 'text': 'Test content'}
            self.client.post(url, data, format='json')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        assert len(response.data) == 5

    def test_can_retrieve_a_single_post(self):
        url = reverse('post-list')
        data = {'title': 'Test Post', 'text': 'Test content'}
        response = self.client.post(url, data, format='json')
        post_id = response.data['id']
        request = self.factory.get(f'/posts/{post_id}')
        response = self.view(request, pk=post_id)
        response.render()  # Cannot access `response.content` without this.

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], post_id)


class CategoryAPITest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=True)
        self.view = CategoryViewSet.as_view({'get': 'retrieve'})

    def test_can_create_a_category(self):
        url = reverse('category-list')
        data = {'name': 'Test Category'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')
        self.assertEqual(Category.objects.get().slug, 'test-category')

    def test_can_update_a_category(self):
        url = reverse('category-list')
        data = {'name': 'Test Category'}
        response = self.client.post(url, data, format='json')

        category_id = response.data['id']
        data = {'id': category_id, 'name': f'New name {category_id}'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], f'New name {category_id}')

    def test_can_list_categories(self):
        url = reverse('category-list')

        for i in range(1, 6):
            data = {'name': f'Test category {i}'}
            self.client.post(url, data, format='json')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        assert len(response.data) == 5

    def test_can_retrieve_a_single_category(self):
        url = reverse('category-list')
        data = {'name': 'Test Category'}
        response = self.client.post(url, data, format='json')
        category_id = response.data['id']
        request = self.factory.get(f'/categories/{category_id}')
        response = self.view(request, pk=category_id)
        response.render()  # Cannot access `response.content` without this.

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], category_id)


class CommentAPITest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=True)
        self.view = CommentViewSet.as_view({'get': 'retrieve'})

    def test_can_create_a_comment(self):
        post_url = reverse('post-list')
        data = {'title': 'Test Post', 'text': 'Test content'}
        response = self.client.post(post_url, data, format='json')
        post_id = response.data['id']

        data = {
            'post': post_id,
            'name': 'Test Comment',
            'email': 'test@test.com',
            'body': 'Test content'
        }
        comment_url = reverse('comment-list')
        response = self.client.post(comment_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)
        self.assertEqual(Comment.objects.get().name, 'Test Comment')
        self.assertEqual(Comment.objects.get().email, 'test@test.com')
        self.assertEqual(Comment.objects.get().body, 'Test content')
        self.assertEqual(Comment.objects.get().post.id, post_id)

    def test_can_update_a_comment(self):
        post_url = reverse('post-list')
        data = {'title': 'Test Post', 'text': 'Test content'}
        response = self.client.post(post_url, data, format='json')
        post_id = response.data['id']

        data = {
            'post': post_id,
            'name': 'Test Comment',
            'email': 'test@test.com',
            'body': 'Test content',
        }
        comment_url = reverse('comment-list')
        response = self.client.post(comment_url, data, format='json')

        comment_id = response.data['id']
        data = {
            'id': comment_id,
            'post': post_id,
            'name': f'New name {comment_id}',
            'email': 'test@test.com',
            'body': 'Test content',
        }
        response = self.client.post(comment_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], f'New name {comment_id}')

    def test_can_list_comment(self):
        post_url = reverse('post-list')
        data = {'title': 'Test Post', 'text': 'Test content'}
        response = self.client.post(post_url, data, format='json')
        post_id = response.data['id']
        comment_url = reverse('comment-list')

        for i in range(1, 6):
            data = {
                'post': post_id,
                'name': f'Test Comment {i}',
                'email': 'test@test.com',
                'body': 'Test content',
            }
            self.client.post(comment_url, data, format='json')

        response = self.client.get(comment_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        assert len(response.data) == 5

    def test_can_retrieve_a_single_comment(self):
        post_url = reverse('post-list')
        data = {'title': 'Test Post', 'text': 'Test content'}
        response = self.client.post(post_url, data, format='json')
        post_id = response.data['id']

        data = {
            'post': post_id,
            'name': 'Test Comment',
            'email': 'test@test.com',
            'body': 'Comments body',
        }
        comment_url = reverse('comment-list')
        response = self.client.post(comment_url, data, format='json')

        comment_id = response.data['id']
        request = self.factory.get(f'/comments/{comment_id}')
        response = self.view(request, pk=comment_id)
        response.render()  # Cannot access `response.content` without this.

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], comment_id)


class TagAPITest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=True)
        self.view = TagViewSet.as_view({'get': 'retrieve'})

    def test_can_create_a_tag(self):
        url = reverse('tag-list')
        data = {'name': 'Test Tag'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Tag.objects.count(), 1)
        self.assertEqual(Tag.objects.get().name, 'Test Tag')
        self.assertEqual(Tag.objects.get().slug, 'test-tag')

    def test_can_update_a_tag(self):
        url = reverse('tag-list')
        data = {'name': 'Test Tag'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test Tag')
        self.assertEqual(response.data['slug'], 'test-tag')

    def test_can_list_tags(self):
        url = reverse('tag-list')

        for i in range(1, 6):
            data = {'name': f'Test Tag {i}'}
            self.client.post(url, data, format='json')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        assert len(response.data) == 5

    def test_can_retrieve_a_single_tag(self):
        url = reverse('tag-list')
        data = {'name': 'Test Tag'}
        response = self.client.post(url, data, format='json')
        tag_id = response.data['id']
        request = self.factory.get(f'/tags/{tag_id}')
        response = self.view(request, pk=tag_id)
        response.render()  # Cannot access `response.content` without this.

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], tag_id)

