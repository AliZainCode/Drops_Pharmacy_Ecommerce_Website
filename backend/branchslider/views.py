from rest_framework.generics import ListAPIView
from .models import BranchSlider
from .serializers import BranchSliderSerializer


class BranchSliderListAPIView(ListAPIView):
    queryset = BranchSlider.objects.filter(is_active=True).order_by("id")
    serializer_class = BranchSliderSerializer