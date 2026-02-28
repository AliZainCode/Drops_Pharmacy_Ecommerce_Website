from django.urls import path
from .views import BrandListAPIView

urlpatterns = [
    path("brands/", BrandListAPIView.as_view(), name="brands"),
]