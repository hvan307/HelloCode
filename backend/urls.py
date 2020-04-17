from django.urls import path
from .views import ListView, DetailView, ListViewForLanguages, DetailViewForLanguage

urlpatterns = [
    path('', ListView.as_view()),
    path('user/<int:pk>/', DetailView.as_view()),
    path('languages/', ListViewForLanguages.as_view()),
    path('language/<int:pk>/', DetailViewForLanguage.as_view())
]