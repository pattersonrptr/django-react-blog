from . import *

from ..models.comment_model import Comment
from core.api_views.comment_view import CommentViewSet


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