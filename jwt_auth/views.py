from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
# which user should be used here?
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer, PopulateUserSerializer
from backend.serializers import PopulateLanguageSerializer

User = get_user_model()

class RegisterView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, _request):
        users = User.objects.all()
        serializer = PopulateUserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful', "user":serializer.data})
        print(serializer.errors)
        return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):
      
        # print(request.data)
        username = request.data.get('form.data.username')
        password = request.data.get('form.data.password')
        # print(username)
        # print(password)

        user = self.get_user(username)
        if not user.check_password(password):
            print('bad password')
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.username, 'aud': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})

