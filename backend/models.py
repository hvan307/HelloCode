from django.db import models
from django.contrib.auth.models import AbstractUser

class Language(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class User(AbstractUser):
    timezone = models.CharField(max_length=50)
    contacts = models.ManyToManyField('self', blank=True)
    languages = models.ManyToManyField(Language, related_name='users', blank=True)
    image = models.ImageField(upload_to='image')
    
    def __str__(self):
        return self.username