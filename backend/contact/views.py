from rest_framework.generics import ListAPIView
from .models import ContactBanner
from .serializers import ContactBannerSerializer


class ContactBannerAPIView(ListAPIView):
    queryset = ContactBanner.objects.all()
    serializer_class = ContactBannerSerializer