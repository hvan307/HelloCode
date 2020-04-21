from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

from .models import Language
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, PopulateUserSerializer, LanguageSerializer, PopulateLanguageSerializer

User = get_user_model()

class ListView(ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, _request):
        users = User.objects.all()
        serializer = PopulateUserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, _request):
        serializer = UserSerializer(data=_request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class ListLanguageByUserView(ListCreateAPIView):

    serializer_class = UserSerializer
    def get_queryset(self):
        langId = self.kwargs.get('langId')
        queryset = User.objects.filter(languages__in=[langId])
        return queryset


class DetailView(RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, _request, pk):
        user = User.objects.get(pk=pk)
        self.check_object_permissions(_request, user)
        serializer = PopulateUserSerializer(user)
        return Response(serializer.data)
    
    def put(self, _request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, data=_request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_202_ACCEPTED)
        return Response(status=HTTP_422_UNPROCESSABLE_ENTITY)
    
    def delete(self, _request, pk):
        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class ListViewForLanguages(ListCreateAPIView):

    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    def get(self, _request):
        language = Language.objects.all()
        serializer = PopulateLanguageSerializer(language, many=True)
        return Response(serializer.data)

    def post(self, _request):
        serializer = LanguageSerializer(data=_request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class DetailViewForLanguage(RetrieveUpdateDestroyAPIView):

    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    def get(self, _request, pk):
        language = Language.objects.get(pk=pk)
        self.check_object_permissions(_request, language)
        serializer = PopulateLanguageSerializer(language)
        return Response(serializer.data)
    
    def put(self, _request, pk):
        language = Language.objects.get(pk=pk)
        serializer = LanguageSerializer(language, data=_request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_202_ACCEPTED)
        return Response(status=HTTP_422_UNPROCESSABLE_ENTITY)
    
    def delete(self, _request, pk):
        language = Language.objects.get(pk=pk)
        language.delete()
        return Response(status=HTTP_204_NO_CONTENT)

