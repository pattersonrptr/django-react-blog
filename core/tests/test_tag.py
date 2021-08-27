from . import *

from ..models.tag_model import Tag
from core.api_views.tag_view import TagViewSet


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