from rest_framework import serializers
from .models import Language
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('__all__')

class LanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Language
        fields = ('__all__')

class PopulateLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('__all__')

class PopulateUserSerializer(serializers.ModelSerializer):

    languages = LanguageSerializer(many=True)
    
    class Meta:
        model = User
        fields = ('__all__')
 