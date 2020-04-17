from django.contrib import admin

from django.contrib.auth import get_user_model
from .models import Language

User = get_user_model()

admin.site.register(Language)
admin.site.register(User)
