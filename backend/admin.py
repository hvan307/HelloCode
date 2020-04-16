from django.contrib import admin

from .models import Language, CustomUser, UserHasLanguage

admin.site.register(Language)
admin.site.register(CustomUser)
admin.site.register(UserHasLanguage)
