from django.urls import path
from information import views

urlpatterns = [
    path('information/', views.InformationViewSet.as_view()),
    path('information/<int:pk>/', views.InformationViewSet.as_view()),
]
