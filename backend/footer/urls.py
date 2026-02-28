from django.urls import path
from .views import *

urlpatterns = [
    path("branches/", BranchAPIView.as_view()),
    path("contacts/", ContactEmailAPIView.as_view()),
    path("downloads/", AppDownloadAPIView.as_view()),
    path("payments/", PaymentMethodAPIView.as_view()),
]