from .views import EventDetailVIew, EventListView, EventRegiterView
from django.urls import path

urlpatterns = [
    path('', EventListView.as_view()),
    path('register', EventRegiterView.as_view()),
    path('<str:event_code>', EventDetailVIew.as_view()),
]
