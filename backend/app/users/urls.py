from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet

router: DefaultRouter = DefaultRouter()
router.register(r'users', UserProfileViewSet)

urlpatterns = router.urls
