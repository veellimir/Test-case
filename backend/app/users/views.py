from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from utils.exceptions import (
    EXCEPTION_USER_CONFLICT_UPDATE,
    EXCEPTION_USER_CONFLICT_CREATE
)

from .models import UserProfile
from .serializers import UserProfileSerializer


class UserProfileViewSet(ModelViewSet):
    queryset: UserProfile = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return UserProfile.objects.filter(user=self.request.user)

        return UserProfile.objects.none()

    def perform_create(self, serializer):
        if UserProfile.objects.filter(user=self.request.user).exists():
            raise EXCEPTION_USER_CONFLICT_CREATE

        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise EXCEPTION_USER_CONFLICT_UPDATE

        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise EXCEPTION_USER_CONFLICT_UPDATE

        instance.delete()

    def create(self, request, *args, **kwargs):
        if not UserProfile.objects.filter(user=request.user).exists():
            data = request.data
            data['user'] = request.user.id
            serializer = self.get_serializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)

            return Response(serializer.errors, status=400)
        return Response({'error': 'Профиль уже существует'}, status=400)
