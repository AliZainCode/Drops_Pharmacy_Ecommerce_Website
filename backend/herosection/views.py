from rest_framework.generics import ListAPIView
from .models import HeroSection
from .serializers import HeroSectionSerializer


class HeroSectionAPIView(ListAPIView):
    queryset = HeroSection.objects.filter(is_active=True).order_by("-created_at")
    serializer_class = HeroSectionSerializer