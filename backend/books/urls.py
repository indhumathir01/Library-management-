from rest_framework.routers import DefaultRouter
from .views import BookViewSet, CategoryViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('', BookViewSet, basename='book')

urlpatterns = router.urls
