from django.contrib import admin

from django.contrib.auth import get_user_model
from .models import Language
from chat.models import Message, Chat

User = get_user_model()

admin.site.register(Language)
admin.site.register(User)
admin.site.register(Chat)
admin.site.register(Message)