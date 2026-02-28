from rest_framework import serializers
from .models import BranchSlider

class BranchSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchSlider
        fields = "__all__"