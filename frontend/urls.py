from django.urls import path, re_path
from frontend.views import index


urlpatterns = [
    path('', index),  # for the empty url
    re_path(r'^.*/$', index, name='index'),  # for all other urls
]
