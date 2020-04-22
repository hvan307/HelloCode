from rest_framework import permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, get_list_or_404
import requests
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from chat.models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer, UserSerializer, PopulateChatSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Chat.objects.all()
        return queryset


class MessageListView(ListAPIView):
    serializer_class = MessageSerializer
    permissions_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Message.objects.all()
        return queryset


class ChatCreateViewWithPk(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )


class ChatCreateViewWithUsername(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        user1pk = get_pk(request.data['user1'])
        user2pk = get_pk(request.data['user2'])
        participants = [user1pk, user2pk]
        return Response(requests.post('http://localhost:4000/api/chat/newchat/', {'participants': participants}))


class ChatListViewByUser(ListAPIView):
    serializer_class = PopulateChatSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        username = self.kwargs.get('username')
        user = get_object_or_404(User, username=username)
        queryset = Chat.objects.filter(participants__in=[user.pk])
        return queryset


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


def get_pk(username):
    user = get_object_or_404(User, username=username)
    return user.pk
