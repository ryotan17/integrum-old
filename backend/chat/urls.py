from rest_framework import routers
from .views import SpaceViewSet, IssueCategoryViewSet, IssueViewSet, MessageViewSet

router = routers.DefaultRouter()
router.register(r'api/space', SpaceViewSet)
router.register(r'api/issuecategory', IssueCategoryViewSet)
router.register(r'api/issue', IssueViewSet)
router.register(r'api/message', MessageViewSet)
