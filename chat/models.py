from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Message(models.Model):
  author = models.ForeignKey(User, related_name='author_messages', on_delete=models.CASCADE)
  content = models.TextField()
  timestamp = models.DateTimeField(auto_now_add=True)

  def __str__ (self):
    return self.author.username

class Chat(models.Model):
  participants = models.ManyToManyField(User, related_name='chats')
  messages = models.ManyToManyField(Message, blank=True)

  def __str__(self):
    return '{}'.format(self.pk)