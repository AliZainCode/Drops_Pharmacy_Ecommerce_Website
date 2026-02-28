from django.urls import path
from .views import ProductListAPIView
from .views import ProductDetailAPIView

urlpatterns = [
    path("home/", ProductListAPIView.as_view(), name="home-products"),
    path("product/<slug:slug>/", ProductDetailAPIView.as_view(), name="product-detail"),
]