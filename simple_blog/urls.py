"""simple_blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.api_views import (
    category_view,
    comment_view,
    post_view,
    tag_view,
)

router = routers.DefaultRouter()
router.register(r'posts', post_view.PostViewSet)
router.register(r'categories', category_view.CategoryViewSet)
router.register(r'comments', comment_view.CommentViewSet)
router.register(r'tags', tag_view.TagViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),

    # API URLs
    path('api/', include(router.urls)),

    path('api/', include('authentication.urls')),

    path('', include('frontend.urls')),
]
