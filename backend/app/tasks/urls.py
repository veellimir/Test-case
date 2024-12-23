from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

router: DefaultRouter = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = router.urls
