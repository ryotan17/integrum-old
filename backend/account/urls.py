from rest_framework import routers
from .views import GroupViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'api/group', GroupViewSet)
router.register(r'api/user', UserViewSet)
