from rest_framework import routers
from .views import GroupViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'group', GroupViewSet)
router.register(r'user', UserViewSet)

