from rest_framework import permissions
from rest_framework.generics import (
  ListAPIView,
  RetrieveAPIView,
  CreateAPIView,
  DestroyAPIView, 
  UpdateAPIView
)
from chat.models import Chat
from .serializers import ChatSerializer

class ChatListView(ListAPIView):
  serializer_class = ChatSerializer
  permission_classes = (permissions.AllowAny, )
  
  def get_queryset(self):
    queryset = Chat.objects.all()
    return queryset

class ChatCreateView(CreateAPIView):
  queryset = Chat.objects.all()
  serializer_class = ChatSerializer
  permission_classes = (permissions.AllowAny, )

class ChatUpdateView(UpdateAPIView):
  queryset = Chat.objects.all()
  serializer_class = ChatSerializer
  permission_classes = (permissions.AllowAny, )

class ChatDetailView(RetrieveAPIView):
  queryset = Chat.objects.all()
  serializer_class = ChatSerializer
  permission_classes = (permissions.AllowAny, )
  
class ChatDeleteView(DestroyAPIView):
  queryset = Chat.objects.all()
  serializer_class = ChatSerializer
  permission_classes = (permissions.AllowAny, )