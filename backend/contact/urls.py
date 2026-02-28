from django.urls import path
from .views import ContactBannerAPIView

urlpatterns = [
    path("contact-banner/", ContactBannerAPIView.as_view(), name="contact-banner"),
]