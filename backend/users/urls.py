from django.urls import path
from .views import MakeUsersView, OTPVerify, RegisterView, LoginView, LogoutView, UserAvatarUpdate, UserCartUpdate, UserDetail, UserExistsView, UserUpdate

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
    path('auth/otp-verify/', OTPVerify.as_view()),
    path('me/', UserDetail.as_view()),
    path('update/', UserUpdate.as_view()),
    path('make/', MakeUsersView.as_view()),
    path('exists/', UserExistsView.as_view()),
    path('cart/update/', UserCartUpdate.as_view()),
    path('avatar/update/', UserAvatarUpdate.as_view())
]
