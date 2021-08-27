from . import *

from ..models.category_model import Category
from core.api_views.category_view import CategoryViewSet


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
