from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import (
  UserSerializer,
  MessageSerializer
)

from .models import (
  User,
  Message
)
# Create your views here.

def create_jwt(user):
  refresh = RefreshToken.for_user(user)
  return {
    "refresh": str(refresh),
    "access": str(refresh.access_token)
  }

class UserView(APIView):
  def post(self, request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
      user = serializer.save()
      tokens = create_jwt(user)
      return Response(data={'tokens': tokens}, status=status.HTTP_201_CREATED)
    else:
      return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MessagesView(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request):
    messages = Message.objects.order_by("date_created")
    serialized = MessageSerializer(messages, many=True).data
    return Response(serialized, status=status.HTTP_200_OK)

class AddMessagesView(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    body = request.data.get("message", "")
    if not body:
        return Response({"Error": "Message Cant Be Empty"}, status=status.HTTP_400_BAD_REQUEST)

    message = Message.objects.create(user=user, body=body)
    serializer = MessageSerializer(message)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

class GetAuthUserView(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user = request.user
    data = UserSerializer(user).data
    return Response(data, status=status.HTTP_200_OK)
  
  def post(self, request):
    name = request.data.get('name')
    password = request.data.get('password')

    if not name or not password:
      return Response ({'Error': 'Provide All Credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=name, password=password)

    if not user:
      return Response({'Error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)
    
    tokens = create_jwt(user)
    return Response(tokens, status=status.HTTP_200_OK)
  
  def put(self, request):
    user = request.user

    serializer = UserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def delete(self, request):
    user = request.user

    user.delete()

    return Response({'Message': 'User Deleted'}, status=status.HTTP_200_OK)