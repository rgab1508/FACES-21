from .views import EventDetailVIew, EventListView
from django.urls import path

urlpatterns = [
    path('', EventListView.as_view()),
    path('<str:event_code>', EventDetailVIew.as_view())
]
