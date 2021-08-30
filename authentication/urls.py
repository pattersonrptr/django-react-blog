from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (
    ObtainTokenPairWithColorView,
    CustomUserCreate,
    GetLoggedUserData,
    LogoutAndBlacklistRefreshTokenForUserView
)

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('logged-user-data/', GetLoggedUserData.as_view(), name='get_logged_user_data'),    # Just test if the API is working
]
