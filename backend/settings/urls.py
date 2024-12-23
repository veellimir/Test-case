from typing import List

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny


schema_view = get_schema_view(
    openapi.Info(
        title="Backend API Dvachhero",
        default_version="v1",
        description="Документация API для Тестового задание",
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns: List[path] = [
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path("", include("app.authentication.urls")),
    path("", include("app.tasks.urls")),
    path("", include("app.users.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)