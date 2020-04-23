from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
# information on get_object_or_404 can be found at https://docs.djangoproject.com/en/3.0/topics/http/shortcuts/
# def my_view(request):
#    obj = get_object_or_404(MyModel, pk=1)
# the above exame code would look in MyModel for pk=1 and return 404 if not found
from .models import Chat

User = get_user_model()

@database_sync_to_async
def get_last_10_messages(chatId):
  chat = get_object_or_404(Chat, id=chatId)
  # this will get all messages from the chat db with id chatId
  # then order them by date and return the last 10
  return chat.messages.order_by('-timestamp').all()[:10]
# Create your views here.

@database_sync_to_async
def get_user_contact(username):
  user = get_object_or_404(User, username=username)
  return user

@database_sync_to_async
def get_current_chat(chatId):
  return get_object_or_404(Chat, id=chatId)
