  
from django.urls import path, re_path

from .views import (
    ChatListView,
    ChatDetailView,
    ChatCreateViewWithUsername,
    ChatUpdateView,
    ChatDeleteView,
    MessageListView,
    ChatCreateViewWithPk,
    ChatListViewByUser
)

app_name = 'chat'

urlpatterns = [
    path('', ChatListView.as_view()),
    path('newchat/', ChatCreateViewWithPk.as_view()),
    path('user/<username>/', ChatListViewByUser.as_view()),
    path('messages/', MessageListView.as_view()),
    path('create/', ChatCreateViewWithUsername.as_view()),
    path('<pk>/', ChatDetailView.as_view()),
    path('<pk>/update/', ChatUpdateView.as_view()),
    path('<pk>/delete/', ChatDeleteView.as_view())
]
