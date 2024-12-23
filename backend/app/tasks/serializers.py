from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model: Task = Task
        fields: list[str] = [
            'id',
            'title',
            'description',
            'completed',
            'user'
        ]
        read_only_fields: list[str] = ['user']
