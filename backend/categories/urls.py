from django.urls import path
from .views import CollectionAPIView

urlpatterns = [
    path("collections/", CollectionAPIView.as_view(), name="collections"),
]