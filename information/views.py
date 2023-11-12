from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from .models import Information
from .serializers import InformationSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from datetime import date


class InformationViewSet(generics.ListCreateAPIView):
    serializer_class = InformationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        Information.objects.filter(end_date__lt=date.today()).delete()
        return Information.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class InformationDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Edit or delete an information object if you own it.
    """
    serializer_class = InformationSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        return Information.objects.all()
