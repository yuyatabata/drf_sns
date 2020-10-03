from django.shortcuts import render
from rest_framework import generics, authentication, permissions
from api_dmr import serializers
from core.models import MessageModel
from rest_framework import viewsets, status
from rest_framework.response import Response


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = serializers.MessageSerializer
    authentification_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(sender=self.request.user):

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'Delete DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {'message': 'Update DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'Patch DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

class InboxListView(viewsets.ReadOnlyModelViewSet):

    queryset = Message.objects.all()
    serializer_class = serializers.MessageSerializer
    authentification_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(receiver=self.request.user)