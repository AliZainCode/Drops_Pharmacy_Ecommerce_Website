from rest_framework.generics import ListAPIView
from .models import Collection
from .serializers import CollectionSerializer


class CollectionAPIView(ListAPIView):
    queryset = Collection.objects.filter(is_active=True)
    serializer_class = CollectionSerializer