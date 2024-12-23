from django.core.exceptions import ObjectDoesNotExist

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import BaseSerializer

from app.users.models import UserProfile
from utils.exceptions import EXCEPTION_USER_PROFILE

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class: type[BaseSerializer] = TaskSerializer

    def get_queryset(self):
        return Task.objects.all()

    @action(detail=False, methods=['get'])
    def my_tasks(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            tasks = Task.objects.filter(user=user_profile)
            serializer = self.get_serializer(tasks, many=True)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"detail": "User profile not found."}, status=404)

    def perform_create(self, serializer):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
        except UserProfile.DoesNotExist:
            raise EXCEPTION_USER_PROFILE
        serializer.save(user=user_profile)
