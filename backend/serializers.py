from rest_framework import serializers
from .models import Language, CustomUser, UserHasLanguage

class CustomUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ('id', 'user', 'timezone', 'language')

class UserHasLanguageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserHasLanguage
        fields = ('id', 'user', 'language', 'proficiency')

class LanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Language
        fields = ('id', 'name')

class PopulateLanguageSerializer(serializers.ModelSerializer):

    # relationship with others?

    class Meta:
        model = Language
        fields = ('id', 'name')

class PopulateCustomUserSerializer(serializers.ModelSerializer):

    # relationship with others?
    
    class Meta:
        model = CustomUser
        fields = ('id', 'user', 'timezone', 'language')

class PopulateUserHasLanguageSerializer(serializers.ModelSerializer):

    # relationship with others?
    
    class Meta:
         model = UserHasLanguage
         fields = ('id', 'user', 'language', 'proficiency')
 