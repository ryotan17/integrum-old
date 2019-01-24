from rest_framework import routers
from .views import SpaceViewSet, IssueCategoryViewSet, IssueViewSet, MessageViewSet

router = routers.DefaultRouter()
router.register(r'space', SpaceViewSet)
router.register(r'issuecategory', IssueCategoryViewSet)
router.register(r'issue', IssueViewSet)
router.register(r'message', MessageViewSet)

