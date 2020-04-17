from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

from .models import Language, CustomUser, UserHasLanguage
from .serializers import LanguageSerializer, PopulateLanguageSerializer, CustomUserSerializer, PopulateCustomUserSerializer, UserHasLanguageSerializer, PopulateUserHasLanguageSerializer

class ListView(ListCreateAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get(self, _request):
        customUsers = CustomUser.objects.all()
        serializer = PopulateCustomUserSerializer(customUsers, many=True)
        return Response(serializer.data)

    def post(self, _request):
        serializer = CustomUserSerializer(data=_request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class DetailView(RetrieveUpdateDestroyAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get(self, _request, pk):
        customUser = CustomUser.objects.get(pk=pk)
        self.check_object_permissions(_request, customUser)
        serializer = PopulateCustomUserSerializer(customUser)
        return Response(serializer.data)
    
    def put(self, _request, pk):
        customUser = CustomUser.objects.get(pk=pk)
        serializer = CustomUserSerializer(customUser, data=_request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_202_ACCEPTED)
        return Response(status=HTTP_422_UNPROCESSABLE_ENTITY)
    
    def delete(self, _request, pk):
        customUser = CustomUser.objects.get(pk=pk)
        customUser.delete()
        return Response(status=HTTP_204_NO_CONTENT)

