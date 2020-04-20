from rest_framework import serializers
from django.contrib.auth import get_user_model
from chat.models import Chat, Message

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('__all__')


class PopulateMessageSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False)

    class Meta:
        model = Message
        fields = ('__all__')

class ChatSerializer(serializers.ModelSerializer):
  class Meta:
    model = Chat
    fields = ('__all__')

class PopulateChatSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'participants', )
