from django.urls import path
from tickets import views

urlpatterns = [
    path('tickets/', views.TicketsViewSet.as_view()),
    path('tickets/<int:pk>/', views.TicketsDetail.as_view()),
]
