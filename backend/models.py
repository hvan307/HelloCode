from django.db import models
from django.contrib.auth.models import User

class Language(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    timezone = models.CharField(max_length=50)

    language = models.ManyToManyField(Language, through='UserHasLanguage')

    def __str__(self):
        return self.user.username

class UserHasLanguage(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    proficiency = models.CharField(max_length=50)