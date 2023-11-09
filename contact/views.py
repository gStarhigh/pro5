from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from .models import Contact
from .serializers import ContactSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class ContactViewSet(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Contact.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Edit or delete a contact ticket if you own it.
    """
    serializer_class = ContactSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        return Contact.objects.all()
