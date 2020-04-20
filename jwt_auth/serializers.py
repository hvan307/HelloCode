from rest_framework import serializers
# should we use our own user or the django user here?
from django.contrib.auth import get_user_model
from backend.serializers import LanguageSerializer
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()

User = get_user_model()

# password verification for users
class UserSerializer(serializers.ModelSerializer):
  
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation', 'languages')

    
class PopulateUserSerializer(serializers.ModelSerializer):
    languages = LanguageSerializer(many=True)

    class Meta:
      model = User
      fields = ('username', 'email', 'languages')
