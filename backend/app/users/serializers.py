from rest_framework import serializers

from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model: UserProfile = UserProfile
        fields: str = '__all__'

