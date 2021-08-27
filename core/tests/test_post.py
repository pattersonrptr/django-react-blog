from . import *

from ..models.post_model import Post
from core.api_views.post_view import PostViewSet


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

