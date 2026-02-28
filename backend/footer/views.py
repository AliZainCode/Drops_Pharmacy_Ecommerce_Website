from rest_framework.generics import ListAPIView
from .models import Branch, ContactEmail, AppDownload, PaymentMethod
from .serializers import *


class BranchAPIView(ListAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer


class ContactEmailAPIView(ListAPIView):
    queryset = ContactEmail.objects.all()
    serializer_class = ContactEmailSerializer


class AppDownloadAPIView(ListAPIView):
    queryset = AppDownload.objects.all()
    serializer_class = AppDownloadSerializer


class PaymentMethodAPIView(ListAPIView):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer