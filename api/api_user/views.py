from django.shortcuts import render
from rest_framework import generics, authentication, permissions
from api_user import serializers
from core.models import Profile, FriendRequest
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import response

class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer

class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = serializers.FriendRequestSerializer
    authentication_class = (authentication.TokenAuthentification,)
    permission_class = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(Q(askTo=self.request.user) | Q(askFrom=self.request.user))
    
    def perform_create(self, serializer):
        try:
            serializer.save(askFrom=self.request.user)
        except:
            raise ValidationError("User can have only unique request")

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'Delete is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'Patch is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
