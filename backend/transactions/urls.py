from rest_framework.routers import DefaultRouter
from .views import IssueRecordViewSet, FineViewSet, ReservationViewSet

router = DefaultRouter()
router.register('issues', IssueRecordViewSet, basename='issue')
router.register('fines', FineViewSet, basename='fine')
router.register('reservations', ReservationViewSet, basename='reservation')

urlpatterns = router.urls
