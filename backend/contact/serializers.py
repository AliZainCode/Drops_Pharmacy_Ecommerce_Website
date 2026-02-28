from rest_framework import serializers
from .models import ContactBanner


class ContactBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactBanner
        fields = "__all__"