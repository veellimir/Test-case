from typing import List

from django.urls import path

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import RegisterView, LogoutView


urlpatterns: List[path] = [
    path('auth/', RegisterView.as_view(), ),
    path('auth/token/', TokenObtainPairView.as_view(), ),
    path('auth/logout/', LogoutView.as_view(), ),
]



# router: DefaultRouter = DefaultRouter()
# router.register(r'токены', TokenObtainPairView)
#
# urlpatterns = router.urls