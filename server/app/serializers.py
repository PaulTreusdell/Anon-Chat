from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import (
  User,
  Message
)

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'name', 'text_background', 'text_color', 'password', 'date_created']
    extra_kwargs = {
      'password': {'write_only': True, 'required': True},
      'name': {'required': True}
    }
  def create(self, validated_data):
    password = validated_data.pop('password')
    user = User.objects.create_user(**validated_data, password=password)
    return user

class MessageSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'user', 'body', 'date_created']

    def get_user(self, obj):
        return {
            "username": obj.user.name,  # or obj.user.username
            "text_color": getattr(obj.user, "text_color", "black"),
            "text_background": getattr(obj.user, "text_background", "white")
        }