from django.urls import path
from .views import OTPVerify, RegisterView, LoginView, LogoutView, UserDetail

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
    path('auth/otp-verify/', OTPVerify.as_view()),
    path('me/', UserDetail.as_view())
]
