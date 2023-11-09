from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from .models import Tickets
from .serializers import TicketsSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class TicketsViewSet(generics.ListCreateAPIView):
    serializer_class = TicketsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Tickets.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TicketsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Edit or delete a ticket if you own it.
    """
    serializer_class = TicketsSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        return Tickets.objects.all()
