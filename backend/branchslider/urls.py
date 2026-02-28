from django.urls import path
from .views import BranchSliderListAPIView

urlpatterns = [
    path("branch-slider/", BranchSliderListAPIView.as_view(), name="branch-slider"),
]