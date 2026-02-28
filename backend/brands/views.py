from rest_framework.generics import ListAPIView
from .models import Brand
from .serializers import BrandSerializer


class BrandListAPIView(ListAPIView):
    queryset = Brand.objects.filter(is_active=True).order_by("id")
    serializer_class = BrandSerializer