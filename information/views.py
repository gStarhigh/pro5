from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from .models import Information
from .serializers import InformationSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class InformationViewSet(generics.ListCreateAPIView):
    serializer_class = InformationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Information.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
