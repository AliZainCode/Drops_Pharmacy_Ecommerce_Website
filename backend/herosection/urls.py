from django.urls import path
from .views import HeroSectionAPIView

urlpatterns = [
    path("hero/", HeroSectionAPIView.as_view(), name="hero-section"),
]